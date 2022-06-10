import Airtable, { FieldSet, Record, Records } from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const base_coffee_stores = base("coffee_stores");

const getMinifiedRecords = (records: Records<FieldSet>) =>
  records.map((record) => getMinifiedRecord(record));

const getMinifiedRecord = (record: Record<FieldSet>) => ({ ...record.fields });

export { base_coffee_stores, getMinifiedRecords, getMinifiedRecord };
