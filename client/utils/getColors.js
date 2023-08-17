import {orderStatusEnum} from "./enums";

export const getStatusColor = (status) => {
    switch (orderStatusEnum[status]) {
        case orderStatusEnum.NEW:
            return "purple"
        case orderStatusEnum.RETURNED:
            return "gray"
        case orderStatusEnum.CANCELLED:
            return "red"
        case orderStatusEnum.PENDING:
            return "indigo"
        case orderStatusEnum.IN_TRANSIT:
            return "blue"
        case orderStatusEnum.COMPLETED:
            return "green"
        default:
            return "blue"
    }
}