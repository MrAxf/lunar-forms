import picocss from './pico.min.css?raw';

export const headHTML = `
<style>
${picocss}
</style>
<style>
.row {
  display: flex;
  align-items: stretch;
  width: 100%;
  gap: 1rem;
}
.col {
  flex: 1;
  width: 100%;
}
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
</style>
`
