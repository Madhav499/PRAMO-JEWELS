import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error Boundary caught an exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-brand-ivory text-brand-charcoal text-center">
          <div className="max-w-md space-y-4 p-8 bg-white border border-brand-stone shadow-luxury">
            <h2 className="font-serif text-2xl font-bold text-brand-gold-dark">Pramo Jewels</h2>
            <p className="text-xs text-brand-slate leading-relaxed">
              We encountered a temporary rendering issue. Please refresh the page to reload the royal gallery.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-brand-gold text-brand-charcoal font-semibold uppercase text-xs tracking-wider"
            >
              Reload Gallery
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
