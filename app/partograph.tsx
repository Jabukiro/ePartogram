import * as React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { AppTheme, useAppTheme } from './_layout';
import { ScrollView } from 'react-native';

const firstRow: Array<[string, string, number]> = [["name", "Name", 4], ["gravida", "Gravida", 2], ["para", "Para", 2], ["hospitalNo", "Hospital No", 2]]
const secondRow: Array<[string, string, number]> = [["dateOfAdmission", "Date", 3], ["timeOfAdmission", "Time", 3], ["rupturedMembrane", "Ruptured membranes", 3], ["hours", "hours", 1]]

const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function PartographScreen() {
  const theme = useAppTheme();
  return (
    <View style={{ backgroundColor: "#fff", paddingHorizontal: theme.spacing.p_05, paddingVertical: theme.spacing.p_1, height: "100%" }}>
      <Surface elevation={3} style={{
        zIndex: 1, paddingVertical: theme.spacing.p_05, paddingHorizontal: theme.spacing.p_1,
        borderBottomLeftRadius: theme.roundness, borderBottomRightRadius: theme.roundness
      }}>
        <View style={{ height: 50, flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "black" }}>
          {firstRow.map((item, index) => (
            <Text key={`paragraphRowKey-${item[0]}`} style={{ flex: item[2], textAlign: "left" }}>{item[1]}:</Text>
          ))}
        </View>
        <View style={{ height: 50, flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "black", marginBottom: theme.spacing.m_2 }}>
          {secondRow.map((item, index) => (
            <Text key={`paragraphRowKey-${item[0]}`} style={{ flex: item[2], textAlign: "left" }}>{item[1]}:</Text>
          ))}
        </View>
      </Surface>
      <ScrollView>
        <Surface style={{ zIndex: 1, paddingVertical: theme.spacing.p_05, paddingHorizontal: theme.spacing.p_1 }}>
          <View style={{ marginBottom: theme.spacing.m_2 }}><FetalHeartRateGrid theme={theme}></FetalHeartRateGrid></View>
          <View style={{ marginBottom: theme.spacing.m_2 }}><LiquorMouldingGrid theme={theme}></LiquorMouldingGrid></View>
          <View style={{ marginBottom: theme.spacing.m_2 }}><ContractionsGrid theme={theme}></ContractionsGrid></View>
          <View style={{ marginBottom: theme.spacing.m_2 }}><OxytocinGrid theme={theme}></OxytocinGrid></View>
          <View style={{ marginBottom: theme.spacing.m_2 }}><TemperatureGrid theme={theme}></TemperatureGrid></View>
          <View style={{ marginBottom: theme.spacing.m_2 }}><UrineGrid theme={theme}></UrineGrid></View>
        </Surface>
      </ScrollView >
    </View >
  )
}
interface GridProps {
  theme: AppTheme
}

function FetalHeartRateGrid({ theme }: GridProps) {
  const measurements = ["180", "170", "160", "150", "140", "130", "120", "110", "100"]
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 1, alignSelf: "center" }}>
        <Text style={{ fontSize: 12 }}>Fetal Heart Rate</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {measurements.map(measurement => (
          <Text style={{}} key={`FHR-measurement-${measurement}`}>{measurement}</Text>
        ))}
      </View>
      <View style={{ flex: 8, height: "100%", paddingTop: theme.spacing.p_1, paddingBottom: theme.spacing.p_1 }}>
        {gridGenerator("fhr", 8, 24).map(el => el)}
      </View>
    </View>
  )
}

function LiquorMouldingGrid({ theme }: GridProps) {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 2, flexDirection: "column" }}>
        <Text style={{ fontSize: 12 }}>Liquor</Text>
        <Text style={{ fontSize: 12 }}>Moulding</Text>
      </View>
      <View style={{ flex: 8, height: "100%" }}>
        {gridGenerator("liquorMoulding", 2, 24).map(el => el)}
      </View>
    </View>
  )
}

function ContractionsGrid({ theme }: GridProps) {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 1, alignSelf: "center" }}>
        <Text style={{ fontSize: 12 }}>Contractions Per 10 mins</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {["5", "4", "3", "2", "1"].map(measurement => (
          <Text style={{}} key={`Contractions-${measurement}`}>{measurement}</Text>
        ))}
      </View>
      <View style={{ flex: 8, height: "100%" }}>
        {gridGenerator("contractions", 2, 24).map(el => el)}
      </View>
    </View>
  )
}

function OxytocinGrid({ theme }: GridProps) {
  return (<View style={{ flexDirection: "row", width: "100%" }}>
    <View style={{ flex: 2, flexDirection: "column" }}>
      <Text style={{ fontSize: 12 }}>Oxytocin U/L</Text>
      <Text style={{ fontSize: 12 }}>drops/min</Text>
    </View>
    <View style={{ flex: 8, height: "100%" }}>
      {gridGenerator("oxytocin", 2, 24).map(el => el)}
    </View>
  </View>)
}

function TemperatureGrid({ theme }: GridProps) {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 2, flexDirection: "column" }}>
        <Text style={{ fontSize: 12 }}>Temp °C</Text>
      </View>
      <View style={{ flex: 8, height: "100%" }}>
        {gridGenerator("temperature", 1, 12).map(el => el)}
      </View>
    </View>
  )
}

function UrineGrid({ theme }: GridProps) {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 3, flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ fontSize: 10 }}>Urine</Text>
      </View>
      <View style={{ flex: 5, flexDirection: "column" }}>
        {["protein", "acetone", "volume"].map(measurement => (
          <Text style={{ fontSize: 10 }} key={`Contractions-${measurement}`}>{measurement}</Text>
        ))}
      </View>
      <View style={{ flex: 32, height: "100%" }}>
        {gridGenerator("temperature", 3, 12).map(el => el)}
      </View>
    </View>
  )
}

function gridGenerator(gridKey: string, rows: number, columns: number) {
  const grid = [];
  if (rows <= 0 || columns <= 0) {
    throw `Expected argument 'rows' and 'columns' to both be bigger than 0, instead got ${rows} ${columns}`;
  }
  for (let row = 0; row < rows; row++) {
    grid.push(<View key={`${gridKey}-row-${row + 1}`} style={{ flex: 1, flexDirection: "row" }}>{cellGenerator(gridKey, row, rows, columns)}</View>)
  }
  return grid;
}

function cellGenerator(gridKey: string, row: number, totalRows: number, totalCols: number) {
  const rowPack = [];
  if (totalCols <= 0) {
    throw `Expected argument 'count' to be bigger than 0, instead got ${totalCols}`;
  }
  for (let i = 0; i < totalCols; i++) {
    rowPack.push(Cell(gridKey, row, totalRows, i, totalCols));
  }
  return rowPack;
}

function Cell(gridKey: string, currentRow: number, totalRows: number, currentColumn: number, totalCols: number) {
  return (<View key={`${gridKey}-${currentColumn}- ${currentRow}`}
    style={{
      flex: 1, borderColor: "black", borderTopWidth: 1, borderLeftWidth: 1,
      borderRightWidth: currentColumn == (totalCols - 1) ? 1 : 0,
      borderBottomWidth: currentRow == (totalRows - 1) ? 1 : 0
    }}>
  </View>)
}