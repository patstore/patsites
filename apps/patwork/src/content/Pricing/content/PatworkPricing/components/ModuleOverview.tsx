import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import features from "../constants/features";
import modules from "../constants/modules";
import type { ModuleGroup } from "../constants/modules";

const GROUPS: ModuleGroup[] = ["group-a", "group-b", "group-c"];

const ModuleOverview = () => {
    const [selectedGroups, setSelectedGroups] = useState<Set<ModuleGroup>>(
        new Set(GROUPS)
    );
    const [expandedModules, setExpandedModules] = useState<Set<string>>(
        new Set()
    );

    const toggleGroup = (group: ModuleGroup) => {
        setSelectedGroups((prev) => {
            const next = new Set(prev);
            if (next.has(group)) {
                next.delete(group);
            } else {
                next.add(group);
            }
            return next;
        });
    };

    const toggleModule = (value: string) => {
        setExpandedModules((prev) => {
            const next = new Set(prev);
            if (next.has(value)) {
                next.delete(value);
            } else {
                next.add(value);
            }
            return next;
        });
    };

    const filteredModules = modules.filter((module) =>
        selectedGroups.has(module.group)
    );

    const getGroupLabel = (group: ModuleGroup) =>
        features.find((f) => f.name === group)?.description ?? group;

    return (
        <div className="module_overview">
            <div className="module_overview_filters">
                {GROUPS.map((group) => (
                    <button
                        key={group}
                        type="button"
                        className={`small module_overview_filter${
                            selectedGroups.has(group) ? " is-active" : ""
                        }`}
                        onClick={() => toggleGroup(group)}
                    >
                        {getGroupLabel(group)}
                    </button>
                ))}
            </div>

            <ul className="module_overview_list">
                {filteredModules.map((module) => {
                    const isExpanded = expandedModules.has(module.value);
                    return (
                        <li
                            key={module.value}
                            className={`module_overview_item${
                                isExpanded ? " is-expanded" : ""
                            }`}
                        >
                            <button
                                type="button"
                                className="module_overview_item_header"
                                onClick={() => toggleModule(module.value)}
                                aria-expanded={isExpanded}
                            >
                                <span className="module_overview_item_label">
                                    {module.label}
                                </span>
                                <span
                                    className={`module-label ${module.group}`}
                                >
                                    <span className="module-label__text">
                                        {getGroupLabel(module.group)}
                                    </span>
                                </span>
                                {/* <ChevronDown
                                    size={16}
                                    className="module_overview_item_chevron"
                                /> */}
                            </button>
                            {isExpanded && (
                                <p className="module_overview_item_description">
                                    {module.description}
                                </p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ModuleOverview;
