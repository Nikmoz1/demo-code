(window as unknown as { global: Window }).global = window;
(window as unknown as { process: { env: { DEBUG?: undefined } } }).process = {
  env: { DEBUG: undefined }
}
