import { toast } from "sonner";

export const showIslandToast = (title, message) => {
  toast.custom(
    (t) => (
      <div
        className="island-toast"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#0a0a0a",
          color: "#fff",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "999px",
          padding: "8px 24px",
          cursor: "pointer",
          transition:
            "border-radius 420ms cubic-bezier(0.34, 1.56, 0.64, 1), padding 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 420ms ease",
          willChange: "border-radius, padding",
          overflow: "hidden",
          userSelect: "none",
          margin: "0 auto",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderRadius = "22px";
          el.style.padding = "14px 24px";
          el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.5)";
          const body = el.querySelector(".island-body");
          body.style.gridTemplateRows = "1fr";
          body.style.opacity = "1";
          body.style.marginTop = "8px";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderRadius = "999px";
          el.style.padding = "8px 24px";
          el.style.boxShadow = "none";
          const body = el.querySelector(".island-body");
          body.style.gridTemplateRows = "0fr";
          body.style.opacity = "0";
          body.style.marginTop = "0";
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {title}
        </p>

        <div
          className="island-body"
          style={{
            display: "grid",
            gridTemplateRows: "0fr",
            opacity: 0,
            marginTop: 0,
            transition:
              "grid-template-rows 380ms cubic-bezier(0.34, 1.56, 0.64, 1), margin-top 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease 60ms",
          }}
        >
          <div style={{ overflow: "hidden", minHeight: 0 }}>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                whiteSpace: "nowrap",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      duration: 4000,
      position: "top-center",
    },
  );
};
