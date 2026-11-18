import React from "react";
import {
  IconCheckCircle,
  IconXCircle,
  IconAlertTriangle,
  IconInfo
} from "./Icons";

export default function ToastNotification({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <IconCheckCircle size={18} className="toast-icon" />;
      case "danger":
        return <IconXCircle size={18} className="toast-icon" />;
      case "warning":
        return <IconAlertTriangle size={18} className="toast-icon" />;
      default:
        return <IconInfo size={18} className="toast-icon" />;
    }
  };

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`clean-toast toast-${toast.type || "info"}`}
          onClick={() => onDismiss(toast.id)}
          title="Klik untuk menutup pemberitahuan"
        >
          {renderIcon(toast.type)}
          <span className="toast-message-text">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
