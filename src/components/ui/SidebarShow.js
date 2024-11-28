import { ClipLoader } from "react-spinners";
import { TooltipDemo } from "../ToolTip";

function SidebarShow({ status, link, slug }) {
  return (
    <div
      className={`flex items-center gap-2 text-base text-zinc-500 px-2 py-2 rounded-xl shadow-sm shadow-black ${
        slug === link.slug && " text-zinc-100  active_sidelink"
      }`}
    >
      <div className="lg:hidden block">
        <TooltipDemo
          className={`bg-transparent p-0 hover:bg-transparent ${
            slug === link.slug ? " text-zinc-100 " : "text-zinc-500"
          }  `}
          content={link.title}
          title={
            <div className="text-xl">
              {status === "pending" ? (
                <ClipLoader color="#ea763d" size={20} />
              ) : (
                link.svg
              )}
            </div>
          }
        />
      </div>
      <div className="text-xl hidden lg:block">
        {status === "pending" ? (
          <ClipLoader color="#ea763d" size={20} />
        ) : (
          link.svg
        )}
      </div>
      <p className="lg:block hidden">{link.title}</p>
    </div>
  );
}

export default SidebarShow;
