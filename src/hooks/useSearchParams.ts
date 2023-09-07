export function useSearchParams() {
  return new URL(window.location.href).searchParams;
}
