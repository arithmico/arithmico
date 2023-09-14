import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Listbox } from "@headlessui/react";

export default function MobileToolbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const items = [
    { label: t("toolbar.definitions") },
    { label: t("toolbar.history") },
    { label: t("toolbar.resetAll") },
  ];

  return (
    <div>
      <Listbox value={items}>
        <Listbox.Label>{t("toolbar.functions")}</Listbox.Label>
        <Listbox.Button>
          {items.map((_, index) => items[index].label)}
        </Listbox.Button>
      </Listbox>
    </div>
  );
}
