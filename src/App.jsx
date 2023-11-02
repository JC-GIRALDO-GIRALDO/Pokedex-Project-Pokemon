import "./App.css";
import { AsideComponent } from "./layout/aside/AsideComponent";
import { MainComponent } from "./layout/main/MainComponent";
import { SectionComponent } from "./layout/section/SectionComponent";

function App() {
  return (
    <>
      {/* Contenedor principal del Layout */}
      <div className="container">
        {/* Contenedor lado izquierdo Section */}
        <section className="main-home">
          <SectionComponent />
        </section>

        {/* Contenedor centro Main */}
        <main className="main-menu">
          <MainComponent />
        </main>

        {/* Contenedor lado derecho Aside */}
        <aside className="sidebar">
          <AsideComponent />
        </aside>
      </div>
    </>
  );
}

export default App;
