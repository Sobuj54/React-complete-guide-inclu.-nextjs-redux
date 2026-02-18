import { CORE_CONCEPTS } from "../data";
import CoreConcept from "./CoreConcept";

function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core concepts</h2>
      <div className="grid">
        {CORE_CONCEPTS.map((concepts) => (
          <CoreConcept {...concepts} key={concepts.title} />
        ))}
      </div>
    </section>
  );
}

export default CoreConcepts;
