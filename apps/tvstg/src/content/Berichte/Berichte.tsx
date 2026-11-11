import React, { useMemo } from "react";
import settings from "@settings";
import { useCollection } from "@provider";
import { Layout } from "@components";
import { BlogElement, FlexBox, HeadContent, SwitchButton } from "@ui";
import { siteContainer, wrapper } from "@styles";
import { switchButtonContainer } from "./styles";
import ReactPaginateModule from "react-paginate";
import "./styles.css";

// Under Node SSR the CommonJS-only build resolves to the module object, not the component.
const ReactPaginate =
  (ReactPaginateModule as unknown as { default?: typeof ReactPaginateModule }).default ??
  ReactPaginateModule;

const ALL = { label: "Alle", value: "alle" };
const ARTICLES_PER_PAGE = 18;

type BerichteProps = {
  kategorie?: string;
  /** 1-based page number. */
  seite: number;
  onCategoryChange: (kategorie: string | undefined) => void;
  onPageChange: (seite: number) => void;
  pageHref: (seite: number) => string;
};

const Berichte: React.FC<BerichteProps> = ({
  kategorie,
  seite,
  onCategoryChange,
  onPageChange,
  pageHref,
}) => {
  const { items: articles } = useCollection("Article");
  const { items: categorys } = useCollection("Category");
  const visible = useMemo(() => {
    return articles
      .filter((article) => !kategorie || article.categories?.includes(kategorie))
      .sort(
        (a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime(),
      );
  }, [articles, kategorie]);
  const pageCount = Math.max(1, Math.ceil(visible.length / ARTICLES_PER_PAGE));
  const pageArticles = visible.slice((seite - 1) * ARTICLES_PER_PAGE, seite * ARTICLES_PER_PAGE);

  const buttons = useMemo(
    () => [
      ALL,
      ...categorys
        .filter((category) => category.type === "sportarten")
        .map((category) => ({ label: category.title || "", value: category.objectId })),
    ],
    [categorys],
  );
  const activeButton = buttons.find((button) => button.value === kategorie) ?? ALL;

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel="Beiträge"
          titeltext="Aktuelle und vergangene Berichte aus dem Vereinsgeschehen"
        />
        <div css={siteContainer}>
          <FlexBox direction="column" align="center" justify="center">
            <FlexBox
              direction="row"
              align="center"
              justify="center"
              wrap
              gap={settings.sizes.medium}
              styles={switchButtonContainer}
            >
              {buttons.map((value) => (
                <SwitchButton
                  key={value.value}
                  initialState={value}
                  state={activeButton}
                  onClick={() =>
                    onCategoryChange(value.value === ALL.value ? undefined : value.value)
                  }
                  text={value.label}
                />
              ))}
            </FlexBox>
            <FlexBox
              justify="space-between"
              wrap
              align="stretch"
              gap={settings.sizes.medium}
            >
              {pageArticles.length > 0 ? (
                pageArticles.map((value) => (
                  <BlogElement
                    type="tile"
                    image={value.image}
                    categories={value.categories}
                    title={value.title}
                    date={value.date}
                    key={value.objectId}
                    flex={["100%", "45%", "30%"]}
                  />
                ))
              ) : (
                <p>Keine Artikel gefunden</p>
              )}
            </FlexBox>
          </FlexBox>
          <ReactPaginate
            breakLabel="..."
            nextLabel="weiter >"
            forcePage={seite - 1}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            hrefBuilder={(page) =>
              page >= 1 && page <= pageCount ? pageHref(page) : undefined
            }
            hrefAllControls
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< zurück"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Berichte;
