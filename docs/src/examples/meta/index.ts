import picocss from './pico.min.css?raw';
import bootstrapgrid from './bootstrap-grid.min.css?raw';

export const headHTML = `
<style>
${picocss}
</style>
<style>
${bootstrapgrid}
</style>
<style>
[data-theme="light"],
:root:not([data-theme="dark"]) {
  --primary: #9333ea;
  --primary-hover: #3b0764;
  --primary-focus: rgba(216, 27, 96, 0.125);
  --primary-inverse: #FFF;
}
@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --primary: #9333ea;
    --primary-hover: #3b0764;
    --primary-focus: rgba(216, 27, 96, 0.25);
    --primary-inverse: #FFF;
  }
}
[data-theme="dark"] {
  --primary: #9333ea;
  --primary-hover: #3b0764;
  --primary-focus: rgba(216, 27, 96, 0.25);
  --primary-inverse: #FFF;
}
</style>
<style>
body { padding: 1rem; }
.box { padding: 1rem; }
.gap { gap: 1rem; }
</style>
`
