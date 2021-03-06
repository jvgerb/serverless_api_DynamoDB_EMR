import { PriceAdjustmentFormula, CustomerContract, PriceAdjustmentFormulaContract, SupplierContract } from "../../models";
import { getNewGuid, getCurrentDateTimeLikeAws } from "..";

export function getPafContractItem (
    contractItem: CustomerContract | SupplierContract, 
    pafItem: PriceAdjustmentFormula,
    isSupplier: boolean): PriceAdjustmentFormulaContract {
    
    /**
     ItemBase overrides

    pk_id       = { paf_id }
    sk          = { customer_contract_id }
    gsi_1_sk    = { customer_contract_id }

    gsi_2_pk:   = { customer_contract_id }
    gsi_2_sk:   = { customer_contract_id }
    gsi_3_pk:   = { customer_contract_id }
    gsi_3_sk:   = { customer_contract_id }

    */

    const contract_id = isSupplier ? (<SupplierContract>contractItem).supply_contract_id : (<CustomerContract>contractItem).customer_contract_id;

    let item = {
        item_id: getNewGuid(),
        item_timestamp: getCurrentDateTimeLikeAws(),
        pk_id: pafItem.paf_id,
        sk: contract_id ,
        gsi_1_sk: contract_id,

        gsi_2_pk: contract_id,
        gsi_2_sk: contract_id ,
        gsi_3_pk: contract_id ,
        gsi_3_sk: contract_id ,

        contract_product: contractItem.contract_product,
        contract_start_date: contractItem.contract_start_date,
        contract_valid_to: contractItem.contract_valid_to,
        contract_partner_type: contractItem.contract_partner_type,
        contract_product_category_type: contractItem.contract_product_category_type,
        contract_terminated: contractItem.contract_terminated,
        contract_comment: contractItem.contract_comment,
        contract_info: contractItem.contract_info,
        contract_notice: contractItem.contract_notice,
        contract_consumption: contractItem.contract_consumption,
        contract_capacity: contractItem.contract_capacity,
        item_type_debug: isSupplier ? "paf_supplier_contract" : "paf_customer_contract"
        };

    if (isSupplier) {
        (<SupplierContract>item).supply_contract_id = (<SupplierContract>contractItem).supply_contract_id;
    } else {
        (<CustomerContract>item).customer_contract_id = (<CustomerContract>contractItem).customer_contract_id;
    }


    return item;
}