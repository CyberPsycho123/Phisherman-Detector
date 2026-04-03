import "./Notpage.css";

export default function Notpage() {
  return (
    <div className="page-404">

      {/* Top-left badge */}
      <div className="badge">Error — Page not found</div>

      {/* Top-right error code */}
      <div className="err-code">0x404</div>

      {/* Center content */}
      <div className="content">
        <div className="num-404">404</div>

        <div className="rule" />

        <h1 className="heading">Page Not Found</h1>
        <p className="body-text">
          The page you're looking for doesn't exist,
          was moved, or never existed at all.
        </p>

        <div className="actions">
          <a className="btn btn-primary" href="/">
            ↩ Go Home
          </a>
          <button className="btn btn-ghost" onClick={() => window.history.back()}>
            ← Go Back
          </button>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="status-bar">
        <span><span className="dot-red">◉</span> &nbsp;Status: Not Found</span>
        <span>HTTP / 404</span>
        <span>ERR_NOT_FOUND</span>
      </div>

    </div>
  );
}