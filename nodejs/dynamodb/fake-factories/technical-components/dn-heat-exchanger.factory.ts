import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate, oneOfYesNo } from "../factory.utils";
import { PodDistributionNetwork, HeatExchanger } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnHeatExchangerItems(index: number, dn: PodDistributionNetwork, childCount: number): HeatExchanger[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { heat_exchanger_id }
    gsi_1_sk    = { heat_exchanger_info.standard_capacity }
    gsi_2_sk:   = { heat_exchanger_info.principle}
    */

    for (let i = index; i < index + childCount; i++){
        const heat_exchanger_id = `HeatExchanger_${index}`;
        const standard_capacity  = `${5 + getRandom(12)} kW`;
        const principle = oneOf(["analog", "digital"]);

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: dn.distribution_network_id,
            sk: heat_exchanger_id,
            gsi_1_sk: standard_capacity ,
            gsi_2_sk: principle,
            item_type_debug: "HeatExchanger",

            heat_exchanger_id: heat_exchanger_id,
            heat_exchanger_manufacturer: oneOf(fakeValueArrays.manufacturers),
            heat_exchanger_serial_number: `2W${index}JK-2V`,
         
            heat_exchanger_info:{
                base_info: {
                    type_designation: "Logalux LSP",
                    list_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_price_net: `\$${1000+getRandom(2000)}`,
                    purchase_date: getRandomDate(1998, 10),
                    purchase_from: oneOf(fakeValueArrays.manufacturers),
                    warranty_until: getRandomDate(2003, 15),
                    installation_date: getRandomDate(2003, 10)
                },
                model: "plate heat exchanger",
                standard_capacity: standard_capacity,
                primary_volume_flow_manufacturer_value: `${50+getRandom(50)} l`,
                primary_entry_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                primary_exit_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                secondary_volume_flow_manufacturer_value: `${20+getRandom(20)} m³`,
                secondary_entry_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                secondary_exit_temperature_manufacturer_value: `${50+getRandom(50)} degree`,
                principle: principle,
                comment: "lorem ipsum dolor sit amet"
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}