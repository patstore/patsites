import { mq } from "@/settings/definitions";
import { GridItemProps, GridProps } from "./types";

// Grid Component Styles
export const createGridStyles = (props: Omit<GridProps, 'children'>) => {
    const {
        columns = "1fr",
        rows = "auto",
        gap,
        columnGap,
        rowGap,
        alignItems = "stretch",
        justifyItems = "stretch",
        alignContent = "stretch",
        justifyContent = "start",
        autoFlow = "row",
        autoColumns,
        autoRows,
        hasFullWidth = false,
        hasFullHeight = false,
        styles = {}
    } = props;

    return mq({
        display: "grid",
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap: gap,
        columnGap: columnGap,
        rowGap: rowGap,
        alignItems: alignItems,
        justifyItems: justifyItems,
        alignContent: alignContent,
        justifyContent: justifyContent,
        gridAutoFlow: autoFlow,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
        width: hasFullWidth ? "100%" : "auto",
        height: hasFullHeight ? "100%" : "auto",
        position: "relative",
        overflow: "visible",
        ...styles
    });
};

// Grid Item Styles
export const createGridItemStyles = (props: Omit<GridItemProps, 'children'>) => {
    const {
        column,
        row,
        columnStart,
        columnEnd,
        rowStart,
        rowEnd,
        area,
        alignSelf,
        justifySelf,
        styles = {}
    } = props;

    return mq({
        gridColumn: column,
        gridRow: row,
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        gridArea: area,
        alignSelf: alignSelf,
        justifySelf: justifySelf,
        ...styles
    });
};