/**
 * Hello Student,
 *
 * This file is a helper file.
 * Thanks to this file you do not have to care yet about how to store
 * your users.
 *
 * HOW TO USE: Look into the README.md
 *
 * ## YOU DO NOT HAVE TO READ OR UNDERSTAND THIS CODE TO USE IT.
 * ## Stop reading here if you just would like to use the database
 * ## and focus on the register, login, getProfile, and logout :)
 * ###########################################################
 * ###########################################################
 * ###########################################################
 * ###########################################################
 * ## Read After this if you intend to update this helper file.
 *
 * This relies on lokijs for the persistence layer and a
 * simple array for the in memory one.
 *
 * Both makeInMemoryDb and makeNewLokiDatabase needs to return
 * the same shape of object.
 * Here is a typescript style signature of said object:
 *
 * type DbInterface<T> = {
 *     create(object: T): {id: string} & T
 *     getById(id: string): {id: string} & T
 * }
 *
 * lokijs: https://github.com/techfort/LokiJS
 *
 * You will find rudimentary tests at the end of this file,
 * you can run them thanks to:
 *     npm run db:test
 * or
 *     yarn db:test
 */


import {default as Loki} from 'lokijs'
import {v4 as uuid} from 'uuid'

const makeInMemoryDb = () => {
    const localDb = []

    return {
        create: (user) => {
            const storedUser = {
                ...user,
                id: uuid()
            }

            localDb.push(storedUser)

            return storedUser
        },
        getById: (id) => {
            return localDb.find(user => user.id === id) || undefined
        }
    }
}

const makeNewLokiDatabase = () => {
    const db = new Loki('sandbox.db');
    const users = db.addCollection('users');

    return {
        create: (user) => {
            const storedUser = {
                ...user,
                id: uuid()
            }

            users.insert(storedUser)

            return storedUser
        },
        getById: (id) => {
            return users.findOne({id}) || undefined
        }
    }
}

/**
 * Db factory
 *
 * @param isPersistent should it return a LokiJS based implementation or array based one?
 * @returns {{
 *              create: (function(*): *&{id: string}),
 *              getById: (function(id: string): {id: string}&*)
 *          }}
 */
const makeDatabase = ({isPersistent} = {isPersistent: false}) =>
    isPersistent ? makeNewLokiDatabase() : makeInMemoryDb()

export default makeDatabase

// TESTS ########################################################

if (process.argv[0].includes("node") && process.argv[1].includes("database.js")) {
    console.log('running database tests -------------')

    // Given
    const dbPersist = makeDatabase({isPersistent: true})
    const dbInMem = makeDatabase({isPersistent: false})

    const testUser = {
        name: "super",
        pw: "else",
        some: {
            nested: "key",
            and: ["an", "array"]
        }
    }

    // When creating user
    const persistUser = dbPersist.create(testUser)
    const inMemStoredUser = dbInMem.create(testUser)

    // Then
    console.assert(persistUser.some.nested === testUser.some.nested, "fail to create user from persist db")
    console.assert(inMemStoredUser.some.nested === testUser.some.nested, "fail to create user from in mem db")
    console.assert(persistUser.id !== undefined, "persistent db returned user without id")
    console.assert(inMemStoredUser.id !== undefined, "in mem user returned db without id")

    // When retrieving user
    const foundPersistedUser = dbPersist.getById(persistUser.id)
    const foundInMemUser = dbInMem.getById(inMemStoredUser.id)
    const notFoundPersistedUser = dbPersist.getById("FAKE-ID")
    const notFoundMemUser = dbPersist.getById("FAKE-ID")

    // Then
    console.assert(foundPersistedUser.name === testUser.name, "retrieving user from persistent db failed")
    console.assert(foundInMemUser.name === testUser.name, "retrieving user from inMem db failed")
    console.assert(notFoundPersistedUser === undefined, "persistent db returned a user from an unknown ID")
    console.assert(notFoundMemUser === undefined, "in mem db returned a user from an unknown ID")

    console.log('All tests performed ---------------')
    console.log('No output means tests passes')
}
