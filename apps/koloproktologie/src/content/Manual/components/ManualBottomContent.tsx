import settings from "@settings";
import { FlexBox } from "@ui";
import React, { useEffect, useState } from "react";
import quotations_array from "../constants/quotations";
import { AnimatePresence, motion } from "framer-motion";
import { quotationText } from "../styles";

type Quotation = (typeof quotations_array)[number];

const ManualBottomContent: React.FC = () => {
    const [quotations, setQuotations] = useState<Quotation>(
        quotations_array[0]
    );

    useEffect(() => {
        setInterval(() => {
            setQuotations(
                quotations_array[
                    Math.floor(Math.random() * quotations_array.length)
                ]
            );
        }, 8000);
    }, []);

    return (
        <FlexBox
            direction="column"
            gap={settings.sizes.small}
            align="stretch"
            hasFullWidth
        >
            <h3 css={{ color: settings.colors.secondary }}>Über das Buch</h3>
            <AnimatePresence mode="wait">
                {quotations_array.map(
                    (quot) =>
                        quotations.id === quot.id && (
                            <motion.div
                                key={quot.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.6 }}
                            >
                                <p css={quotationText}>{quot.quotation}</p>
                            </motion.div>
                        )
                )}
            </AnimatePresence>
        </FlexBox>
    );
};

export default ManualBottomContent;
