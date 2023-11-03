/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import type { FieldValue, Maybe } from '@lunar-forms/core';
import { computedAsync, useIntersectionObserver } from '@vueuse/core';
import type { MaybeElement } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

import { GetDataAbortedError } from '@/errors';
import type { SelectLabelValue, SelectLabelValueAsync } from '@/types';

interface UseInputSelectFieldParams<T extends SelectLabelValue> {
  isMultiple: Ref<boolean>;
  placeholder: Ref<Maybe<string>>;
  loadOption: Ref<Maybe<(value: FieldValue) => Promise<T>>>;
  value: Ref<FieldValue>;
  parseOptions: SelectLabelValueAsync<T>;
  canGetDataOnReset?: () => boolean;
}

export function useInputSelectField<T extends SelectLabelValue>({
  isMultiple,
  placeholder,
  loadOption,
  value,
  parseOptions,
  canGetDataOnReset,
}: UseInputSelectFieldParams<T>) {
  const isLoading = ref(false);
  const isMore = ref(false);
  const currentpage = ref(1);

  const selectOptions = ref<T[]>([]);

  const reference = ref<MaybeElement>(null);
  const floating = ref<any>(null);
  const ioRoot = ref<MaybeElement>(null);
  const ioTarget = ref<MaybeElement>(null);

  const labelCache = new Map<FieldValue, T>();

  let getDataAbortController = new AbortController();

  const selectedOption = computedAsync(async () => {
    if (!isMultiple.value && value.value) {
      return await getOption(value.value);
    } else if (
      isMultiple.value &&
      Array.isArray(value.value) &&
      value.value.length > 0
    ) {
      return await Promise.all(
        value.value.slice(0, 3).map((item: FieldValue) => getOption(item))
      );
    }
    return placeholder.value;
  }, placeholder.value);

  const { floatingStyles } = useFloating(reference, floating, {
    placement: 'bottom',
    middleware: [flip(), offset(10), shift()],
    whileElementsMounted: autoUpdate,
  });

  useIntersectionObserver(
    ioTarget,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isMore.value = false;
        try {
          getData();
        } catch (error) {
          if (error instanceof GetDataAbortedError) return;
          console.error(error);
        }
      }
    },
    {
      root: ioRoot,
    }
  );

  async function getOption(value: FieldValue) {
    if (labelCache.has(value)) {
      return labelCache.get(value) as T;
    }
    const option = loadOption.value
      ? await loadOption.value(value)
      : selectOptions.value.find((item) => item.value === value);
    if (!option) {
      return { value: value, label: 'Elemento no encontrado' } as T;
    }
    // @ts-ignore
    labelCache.set(value, option);
    return option as T;
  }

  function hasMore() {
    isMore.value = true;
    currentpage.value++;
  }

  function getData() {
    const signal = getDataAbortController.signal;
    return new Promise<void>((resolve, reject) => {
      const abortError = new GetDataAbortedError('Get data aborted');

      if (signal.aborted) reject(abortError);

      signal.addEventListener('abort', () => {
        reject(abortError);
      });

      (async () => {
        isLoading.value = true;
        try {
          const data = await parseOptions({
            page: currentpage.value,
            hasMore,
            signal,
          });

          data.forEach((item) => {
            labelCache.set(item.value, item);
          });

          // @ts-ignore
          selectOptions.value = selectOptions.value.concat(data);
          isLoading.value = false;
          resolve();
        } catch (error) {
          isLoading.value = false;
          console.error(error);
          reject(error);
        }
      })();
    });
  }

  function reset() {
    if (isLoading.value) {
      getDataAbortController.abort();
      getDataAbortController = new AbortController();
    }

    selectOptions.value = [];
    currentpage.value = 1;
    isMore.value = false;

    if (canGetDataOnReset && !canGetDataOnReset()) return;

    try {
      getData();
    } catch (error) {
      if (error instanceof GetDataAbortedError) return;
      console.error(error);
    }
  }

  onMounted(() => {
    reset();
  });

  return {
    isLoading,
    isMore,

    selectOptions,

    reference,
    floating,
    ioRoot,
    ioTarget,

    selectedOption,

    floatingStyles,

    reset,
  };
}
