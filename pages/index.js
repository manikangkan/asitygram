import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <Header />
      <Feed />
      {/* Modal */}
      <Modal />
    </div>
  );
}
