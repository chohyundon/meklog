export type AppleAuthButtonProps = {
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
  onSuccess: () => Promise<void>;
  onError: (message: string) => void;
};
