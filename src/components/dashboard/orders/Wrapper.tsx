import SideBar from "../SideBar";
import Header from "./Header";
import HistoryTable from "./HistoryTable";

const Wrapper = () => {
  return (
    <>
      <div className="w-full h-full flex flex-row gap-4">
        <div className="w-[15%] h-full bg-white/10 backdrop-blur-md rounded-xl p-4 border border-slate-300">
          <SideBar />
        </div>
        <section className="w-[85%] h-full bg-white/10 backdrop-blur-md rounded-xl p-4 border border-slate-300">
          <div className="w-full h-full flex flex-col gap-10 bg-white rounded-xl p-5">
            <Header />
            <div className="w-full h-full overflow-x-auto">
              <HistoryTable />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Wrapper;
