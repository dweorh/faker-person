// const sqlite3 = require('sqlite3').verbose()
// import sqlite3 from "sqlite3"
import sqlite3 from "@vscode/sqlite3"
export default class PersonGenerator {
    db = false
    names_qty = 0
    surnames_qty = 0
    constructor () {}

    async init(file) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db = await this._connect(file)
                this.db.serialize(async () => {
                    this.names_qty = await this._fetchOne('SELECT count(*) as qty FROM names', 'qty')
                    this.surnames_qty = await this._fetchOne('SELECT count(*) as qty FROM surnames', 'qty')
                    resolve()
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    async person (lang = '', gender = '') {
        return new Promise((resolve, reject) => {
            this.db.parallelize(async () => {
                try {
                    let name_query = 'SELECT name FROM names WHERE id = abs(random()) % ?'
                    let name_params = [ this.names_qty ]
                    let surname_query = 'SELECT surname FROM surnames WHERE id = abs(random()) % ?'
                    let surname_params = [ this.surnames_qty ]

                    if (lang && lang !== '') {
                        name_query = 'SELECT name FROM names WHERE lang = ?'
                        name_params = [ lang.toLowerCase() ]
                        surname_query = 'SELECT surname FROM surnames WHERE lang = ?'
                        surname_params = [ lang.toLowerCase() ]
                    }

                    if (gender && gender !== '') {
                        name_query += ' AND gender = ?'
                        name_params.push(gender.toUpperCase())
                    }

                    if (lang || gender) {
                        name_query += ' ORDER BY random()'
                        surname_query += ' ORDER BY random()'
                    }
                    let name = await this._fetchOne(name_query, 'name', name_params ) || 'John'
                    let surname = await this._fetchOne(surname_query, 'surname', surname_params) || 'Doe'
                    let unique = 1900 + Math.floor(Math.random() * 130)
                    let alias = this.sanitizeForAlias(name) + '.' + this.sanitizeForAlias(surname) + unique
                    resolve({
                        name,
                        surname,
                        alias
                    })
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    sanitizeForAlias (str) {
        let s = str.toLowerCase()
        s = s.replaceAll('ó', 'o').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('á', 'a')
        s = s.replaceAll(' ', '-').replaceAll("'", '-').replaceAll('`', '-')
        return s
    }

    async disconnect() {
        return new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve()))
    }

    async _connect(file) {
        return new Promise((resolve, reject) => {
            const conn = new sqlite3.Database(file, sqlite3.OPEN_READONLY, err => err ? reject(err) : resolve(conn) )
        })
    }

    async _fetchRow(query, params) {
        return new Promise((resolve, reject) => this.db.get(query, params, (err, row) => err ? reject(err) : resolve(row)))
    }
    
    async _fetchOne(query, column, params) {
        return new Promise((resolve, reject) =>
            this._fetchRow(query, params).then(row => resolve(row ? row[column] : undefined )).catch(err => reject(err))
        )
    }
}