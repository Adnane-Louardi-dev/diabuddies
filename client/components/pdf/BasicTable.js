import {Text, View} from '@react-pdf/renderer';
import {styles} from "./pdf-utils"

export const BasicTable = ({cols, data, tableHeaderStyles ={}, tableRowsStyles={}, cellStyle={}, oddRowsStyles={}}) => {
    return (
        <View style={{marginBottom: 20}}>
            <View style={[styles.row, tableHeaderStyles]}>
                {cols.map((col,i) => {
                        const headerStyles = col.styles ? col.styles : {}
                        return <Text key={`th-${i}-${col.key}`} style={{width: col.width, ...headerStyles}}>
                            {col.title}
                        </Text>
                    }
                )}
            </View>
            {data.map((row,i) =>
                <View style={[styles.row, tableRowsStyles, i % 2 === 1 ? oddRowsStyles : {}]}
                      key={row.id}>
                    {cols.map((col,j) =>
                        <Text key={`th-${i}-${j}-${col.key}`} style={[cellStyle, {width: col.width}, col.styles ? col.styles : {}]}>
                            {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex] }
                        </Text>)}
                </View>
            )}
        </View>)
}