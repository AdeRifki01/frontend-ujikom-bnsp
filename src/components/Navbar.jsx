import React from "react";

export default function Navbar({ isBackendConnected }) {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <div className="nav-brand">
                    <div className="brand-icon">🎓</div>
                    <div className="brand-text">
                        <h1>DATA SISWA</h1>
                        <p>Uji Kompetensi FullStack Web Developer (Node.js & React)</p>
                    </div>
                </div>

                <div className="nav-status">
                    <span
                        className="status-badge"
                        style={{
                            backgroundColor: isBackendConnected ? "var(--success-light)" : "var(--danger-light)",
                            color: isBackendConnected ? "#065f46" : "#991b1b",
                        }}
                    >
                        <span
                            className="status-dot"
                            style={{
                                backgroundColor: isBackendConnected ? "var(--success)" : "var(--danger)",
                            }}
                        ></span>
                        {isBackendConnected ? "Backend Terhubung (Port 5000)" : "Backend Terputus"}
                    </span>
                </div>
            </div>
        </header>
    );
}
