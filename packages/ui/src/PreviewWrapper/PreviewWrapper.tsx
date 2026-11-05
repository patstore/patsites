type PreviewWrapperProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    preview?: boolean;
  };
  
  export default function PreviewWrapper({
    children,
    fallback = null,
    preview = false,
  }: PreviewWrapperProps) {
  
    return preview
      ? children
      : fallback;
  }