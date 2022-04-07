import PersonGenerator from "../src/person_generator.js"

(async() => {
    const generator = new PersonGenerator()
    await generator.init('databases/names.db')
    
    let rounds = process.env.npm_config_rounds || 100
    let ts = Date.now()
    for (let i = 0; i < rounds; i++) 
        console.log(await generator.person())
    console.log(`[${rounds} rounds - print]`, (Date.now() - ts) / 60)

    ts = Date.now()
    for (let i = 0; i < rounds; i++) 
        await generator.person()
    console.log(`[${rounds} rounds - no print]`, (Date.now() - ts) / 60)
})()