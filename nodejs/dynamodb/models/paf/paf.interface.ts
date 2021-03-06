import { ItemBase, PriceAdjustmentFormulaBase } from "../base";

export interface PriceAdjustmentFormula extends ItemBase, PriceAdjustmentFormulaBase {
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { paf_id }
    gsi_1_sk    = { paf_id }

    gsi_2_pk:   = { paf_id }
    gsi_2_sk:   = { paf_id }
    gsi_3_pk:   = { paf_id }
    gsi_3_sk:   = { paf_id }
    */
}