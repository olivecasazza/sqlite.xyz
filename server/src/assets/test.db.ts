import { readFile } from "fs";
import { Table } from "../entity/metric.model";

export const loadTestDb = async (): Promise<string> => {
    const testDbPath = '/home/colin/Code/SDSU/sci_databases/sqlitexyz/server/src/assets/chinook.db';
    return new Promise((resolve, reject) => {
        readFile(testDbPath, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.toString());
        });
    });
};

export const testDbTables: Table[] = [
    { tableName: 'albums', columns: ['AlbumId', 'Title', 'ArtistId'] },
    { tableName: 'artists', columns: ['ArtistId', 'Name'] },
    {
        tableName: 'customers',
        columns: [
            'CustomerId',
            'FirstName',
            'LastName',
            'Company',
            'Address',
            'City',
            'State',
            'Country',
            'PostalCode',
            'Phone',
            'Fax',
            'Email',
            'SupportRepId',
        ],
    },
    {
        tableName: 'employees',
        columns: [
            'EmployeeId',
            'LastName',
            'FirstName',
            'Title',
            'ReportsTo',
            'BirthDate',
            'HireDate',
            'Address',
            'City',
            'State',
            'Country',
            'PostalCode',
            'Phone',
            'Fax',
            'Email',
        ],
    },
    {
        tableName: 'genres',
        columns: ['GenreId', 'Name'],
    },
    {
        tableName: 'invoice_items',
        columns: [
            'InvoiceLineId',
            'InvoiceId',
            'TrackId',
            'UnitPrice',
            'Quantity',
        ],
    },
    {
        tableName: 'invoices',
        columns: [
            'InvoiceId',
            'CustomerId',
            'InvoiceDate',
            'BillingAddress',
            'BillingCity',
            'BillingState',
            'BillingCountry',
            'BillingPostalCode',
            'Total',
        ],
    },
    {
        tableName: 'media_types',
        columns: ['MediaTypeId', 'Name'],
    },
    {
        tableName: 'playlist_track',
        columns: ['PlaylistId', 'TrackId'],
    },
    {
        tableName: 'playlists',
        columns: ['PlaylistId', 'Name'],
    },
    {
        tableName: 'tracks',
        columns: [
            'TrackId',
            'Name',
            'AlbumId',
            'MediaTypeId',
            'GenreId',
            'Composer',
            'Milliseconds',
            'Bytes',
            'UnitPrice',
        ],
    },
];
