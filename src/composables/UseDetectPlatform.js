import { useQuasar } from "quasar";

export default function useDetectPlatform() {
  const $q = useQuasar();

  function mobilePlatform() {
    if ($q.platform.is.mobile)
      return true;
  }

  function androidPlatform() {
    if ($q.platform.is.mobile)
      return true;
  }

  function desktopPlatform() {
    if ($q.platform.is.mobile)
      return true;
  }

  return {
    mobilePlatform,
    androidPlatform,
    desktopPlatform
  };
}
