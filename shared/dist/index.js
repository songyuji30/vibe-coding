"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ErrorBoundary: () => ErrorBoundary,
  LoadingSpinner: () => LoadingSpinner,
  PageContainer: () => PageContainer,
  createError: () => createError,
  formatCurrency: () => formatCurrency,
  formatDateTime: () => formatDateTime,
  formatDuration: () => formatDuration,
  handleError: () => handleError,
  isAppError: () => isAppError,
  isValidDateString: () => isValidDateString,
  isValidEmail: () => isValidEmail,
  isValidUrl: () => isValidUrl,
  truncateText: () => truncateText,
  validatePassword: () => validatePassword
});
module.exports = __toCommonJS(index_exports);

// src/types/common.ts
function isAppError(error) {
  return typeof error === "object" && error !== null && "code" in error && "message" in error;
}

// src/utils/formatters.ts
function formatDateTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().replace("T", " ").substring(0, 16);
}
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
}

// src/utils/validators.ts
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
function isValidDateString(dateString) {
  return !Number.isNaN(new Date(dateString).getTime());
}
function validatePassword(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = true
  } = options;
  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long`
    };
  }
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter"
    };
  }
  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter"
    };
  }
  if (requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number"
    };
  }
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one special character"
    };
  }
  return { isValid: true };
}

// src/utils/error-handler.ts
function createError(message, code, statusCode = 500, details) {
  const error = new Error(message);
  error.code = code;
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
}
function handleError(error, context) {
  console.error("Error occurred:", error, context);
  if (isAppError2(error)) {
    return {
      status: error.statusCode || 500,
      error: error.message,
      code: error.code,
      details: error.details
    };
  }
  if (error instanceof Error) {
    return {
      status: 500,
      error: error.message || "Internal Server Error",
      code: "INTERNAL_ERROR"
    };
  }
  return {
    status: 500,
    error: "An unknown error occurred",
    code: "UNKNOWN_ERROR"
  };
}
function isAppError2(error) {
  return typeof error === "object" && error !== null && "code" in error && "message" in error;
}

// src/components/common/LoadingSpinner.tsx
var import_core = require("@mantine/core");
var import_jsx_runtime = require("react/jsx-runtime");
function LoadingSpinner({
  size = "md",
  className = "",
  center = true,
  color
}) {
  const spinner = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Loader, { size, color });
  if (center) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Box, { className: `flex items-center justify-center p-4 ${className}`, children: spinner });
  }
  return spinner;
}

// src/components/common/ErrorBoundary.tsx
var import_react = require("react");
var import_core2 = require("@mantine/core");
var import_icons_react = require("@tabler/icons-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ErrorBoundary = class extends import_react.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleReset", () => {
      this.setState({ hasError: false, error: null });
    });
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core2.Box, { p: "md", maw: 800, mx: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        import_core2.Alert,
        {
          icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons_react.IconAlertCircle, { size: "1rem" }),
          title: "Something went wrong",
          color: "red",
          variant: "outline",
          mb: "md",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core2.Text, { mb: "md", children: this.state.error?.message || "An unexpected error occurred" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_core2.Button, { color: "red", onClick: this.handleReset, children: "Try again" })
          ]
        }
      ) });
    }
    return this.props.children;
  }
};

// src/components/common/PageContainer.tsx
var import_core3 = require("@mantine/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
function PageContainer({
  children,
  maxWidth = "xl",
  withTopPadding = true,
  withBottomPadding = true,
  className = "",
  ...rest
}) {
  const theme = (0, import_core3.useMantineTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_core3.Box,
    {
      className: `w-full mx-auto px-4 sm:px-6 lg:px-8 ${withTopPadding ? "pt-8" : ""} ${withBottomPadding ? "pb-12" : ""} ${className}`,
      style: {
        maxWidth: typeof maxWidth === "string" && theme.breakpoints[maxWidth] ? theme.breakpoints[maxWidth] : maxWidth
      },
      ...rest,
      children
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorBoundary,
  LoadingSpinner,
  PageContainer,
  createError,
  formatCurrency,
  formatDateTime,
  formatDuration,
  handleError,
  isAppError,
  isValidDateString,
  isValidEmail,
  isValidUrl,
  truncateText,
  validatePassword
});
//# sourceMappingURL=index.js.map