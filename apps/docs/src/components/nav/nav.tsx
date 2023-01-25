import React from "react";
import { Link } from "react-router-dom";
import { Chapter } from "../../types";

interface NavProps {
  chapters: Chapter[];
}

export default function Nav({ chapters }: NavProps) {
  return (
    <nav className="">
      <ul className="m-0 p-0">
        {chapters.map((chapter, index) => (
          <li key={index} className="m-0 flex p-0">
            <Link
              to={`/chapters/${index}`}
              className="flex-1 py-2 px-4 text-black hover:hover:bg-black/20"
            >
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
