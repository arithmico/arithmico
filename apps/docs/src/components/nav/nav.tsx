import React from "react";
import { Link } from "react-router-dom";
import { Chapter } from "../../types";

interface NavProps {
  chapters: Chapter[];
}

export default function Nav({ chapters }: NavProps) {
  return (
    <nav className="mt-6">
      <ul className="m-0 p-0">
        {chapters.map((chapter, index) => (
          <li key={index} className="flex m-0 p-0">
            <Link
              to={`/chapters/${index}`}
              className="text-black py-2 px-4 flex-1 hover:hover:bg-black/20"
            >
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
