import noProjectImage from "../assets/no-projects.png";
import Button from "./Button";

function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="w-2/3 mt-24 text-center">
      <img
        src={noProjectImage}
        alt="Empty"
        className="object-contain w-16 h-16 mx-auto"
      />
      <h2 className="my-4 text-xl font-bold text-stone-700">
        No project selected.
      </h2>
      <p className="mb-4 text-stone-600">
        Select a project or get started with new one.
      </p>
      <p className="mt-8 text-stone-600">
        <Button onClick={onStartAddProject}>Create New Project</Button>
      </p>
    </div>
  );
}

export default NoProjectSelected;
