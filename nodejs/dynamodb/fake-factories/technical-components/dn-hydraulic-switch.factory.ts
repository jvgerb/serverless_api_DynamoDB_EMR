import { getCurrentDateTimeLikeAws, getNewGuid, oneOf, getRandom, getRandomDate} from "../factory.utils";
import { PodDistributionNetwork, HydraulicSwitch } from "../../models";
import { fakeValueArrays } from "../fake-value.arrays";

export function getNewDnHydraulicSwitchItems(start_index: number, dn: PodDistributionNetwork, childCount: number): HydraulicSwitch[] {
    const dbItems = [];

    /**
     ItemBase overrides

    pk_id       = { distribution_network_id }
    sk          = { hydraulic_switch_id }
    gsi_1_sk    = { component_type }

    gsi_2_pk:   = { component_type }
    gsi_2_sk:   = { component_type }
    gsi_3_pk:   = { component_type }
    gsi_3_sk:   = { component_type }
    */

    for (let i = start_index; i < start_index + childCount; i++){
        const hydraulic_switch_id = `HydraulicSwitch_${i}`;
        const pipe_cross_section  = `${10+getRandom(30)} DN`;
        const component_type = "hydraulic_switch";

        const dbItem = {
            item_id: getNewGuid(),
            item_timestamp: getCurrentDateTimeLikeAws(),
            pk_id: hydraulic_switch_id,
            sk: dn.distribution_network_id,
            gsi_1_sk: component_type,

            gsi_2_pk: component_type,
            gsi_2_sk: component_type,
            gsi_3_pk: component_type,
            gsi_3_sk: component_type,
            
            item_type_debug: "hydraulic_switch",

            hydraulic_switch_id: hydraulic_switch_id,
            component_type: component_type,
            component_manufacturer: oneOf(fakeValueArrays.manufacturers), 
            component_serial_number: `2W${i}JK-2F`,
            component_base_info: {
                type_designation: "WST",
                list_price_net: `\$${1000+getRandom(2000)}`,
                purchase_price_net: `\$${1000+getRandom(2000)}`,
                purchase_date: getRandomDate(1998, 10),
                purchase_from: oneOf(fakeValueArrays.manufacturers),
                warranty_until: getRandomDate(2003, 15),
                installation_date: getRandomDate(2003, 10)
            },
             
            hydraulic_switch_info: {
                pipe_cross_section: pipe_cross_section, 
                comment: "lorem ipsum dolor sit amet" 
            }
        };

        dbItems.push(dbItem);
    }

    return dbItems;
}