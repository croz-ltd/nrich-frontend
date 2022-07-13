/* eslint-disable object-curly-newline */
import React, { ChangeEvent, FormEvent } from "react";

import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from "@mui/material";

interface Car {
  registrationNumber: string,
  manufacturedTime: Date,
  price: number,
  numberOfKilometers: number,
  carType: { make: string, model: string } | undefined,
  carTypeMake: string,
  carTypeModel: string,
}

const SearchResults = ({ rows }: { rows: Car[] }) => {
  const currencyFormat = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Registration Number</TableCell>
            <TableCell>Manufactured Time</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Nb. of kilometers</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Car, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell>{row.registrationNumber}</TableCell>
              <TableCell>{row.manufacturedTime.toLocaleDateString("en-GB")}</TableCell>
              <TableCell>{currencyFormat.format(row.price)}</TableCell>
              <TableCell>{row.numberOfKilometers}</TableCell>
              <TableCell>{row.carType?.make || row.carTypeMake}</TableCell>
              <TableCell>{row.carType?.model || row.carTypeModel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapResponseData = (data: any) => data?.content?.map((dataRow: any) => ({ ...dataRow, manufacturedTime: new Date(dataRow.manufacturedTime) })) ?? [];

const createPostOptions = (formData: any) => ({ method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } });

const Search = () => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const [form, setForm] = React.useState({
    registrationNumber: "",
    manufacturedTimeFrom: "",
    manufacturedTimeTo: "",
    priceFromIncluding: "",
    priceTo: "",
    numberOfKilometers: "",
    carTypeMake: "",
    carTypeModel: "",
  });
  const [search, setSearch] = React.useState("");
  const [formResults, setFormResults] = React.useState<Car[]>([]);
  const [searchResults, setSearchResults] = React.useState<Car[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmitFormSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      ...form,
      manufacturedTimeFrom: form.manufacturedTimeFrom && form.manufacturedTimeFrom.length > 0 ? new Date(form.manufacturedTimeFrom).toISOString() : null,
      manufacturedTimeTo: form.manufacturedTimeTo && form.manufacturedTimeTo.length > 0 ? new Date(form.manufacturedTimeTo).toISOString() : null,
      pageNumber: 0,
      pageSize: 20,
    };
    fetch("search/search-car", createPostOptions(formData))
      .then((response) => response.json())
      .then((data) => setFormResults(mapResponseData(data)));
  };

  const onSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      searchTerm: search,
      propertyToSearchList: ["registrationNumber", "manufacturedTime", "price", "numberOfKilometers", "carType.make", "carType.model"],
    };
    fetch("search/string-search-car", createPostOptions(formData))
      .then((response) => response.json())
      .then((data) => setSearchResults(mapResponseData(data)));
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTabIndex} onChange={handleChange}>
          <Tab label="Form search" />
          <Tab label="String search" />
        </Tabs>
      </Box>
      {selectedTabIndex === 0 && (
        <div>
          <Box component="form" noValidate autoComplete="off" sx={{ m: "20px 0", display: "flex", justifyContent: "space-between" }} onSubmit={onSubmitFormSearch}>
            <TextField label="Registration number" type="text" sx={{ mr: 1 }} name="registrationNumber" value={form.registrationNumber} onChange={onChange} />
            <TextField label="Manufactured time from" type="date" sx={{ mr: 1 }} name="manufacturedTimeFrom" value={form.manufacturedTimeFrom} onChange={onChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Manufactured time to" type="date" sx={{ mr: 1 }} name="manufacturedTimeTo" value={form.manufacturedTimeTo} onChange={onChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Price from" type="number" sx={{ mr: 1 }} name="priceFromIncluding" value={form.priceFromIncluding} onChange={onChange} />
            <TextField label="Price to" type="number" sx={{ mr: 1 }} name="priceTo" value={form.priceTo} onChange={onChange} />
            <TextField label="Number of kilometers" type="number" sx={{ mr: 1 }} name="numberOfKilometers" value={form.numberOfKilometers} onChange={onChange} />
            <TextField label="Car make" type="text" sx={{ mr: 1 }} name="carTypeMake" value={form.carTypeMake} onChange={onChange} />
            <TextField label="Car model" type="text" sx={{ mr: 1 }} name="carTypeModel" value={form.carTypeModel} onChange={onChange} />
            <Button type="submit" color="primary">Search</Button>
          </Box>
          <SearchResults rows={formResults} />
        </div>
      )}
      {selectedTabIndex === 1 && (
        <div>
          <Box component="form" noValidate autoComplete="off" width="100%" sx={{ m: "20px 0", display: "flex", justifyContent: "space-between" }} onSubmit={onSubmitSearch}>
            <TextField label="Search" type="text" fullWidth value={search} sx={{ mr: 1 }} onChange={(e) => setSearch(e.target.value)} />
            <Button type="submit" color="primary">Search</Button>
          </Box>
          <SearchResults rows={searchResults} />
        </div>
      )}
    </div>
  );
};

export default Search;
