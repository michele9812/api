import fetch from "node-fetch";

export default async function handler(req, res) {
    // URL del file JSON remoto
    const jsonUrl = "https://raw.githubusercontent.com/michele9812/Accessibility/main/Visualreference.json";

    // Leggi il parametro della query
    const { component_name } = req.query;

    if (!component_name) {
        return res.status(400).json({ error: "Il parametro 'component_name' è obbligatorio." });
    }

    // Scarica il file JSON
    const response = await fetch(jsonUrl);
    if (!response.ok) {
        return res.status(500).json({ error: "Impossibile scaricare il file JSON." });
    }

    const components = await response.json();

    // Cerca il componente richiesto
    const component = components.find(c => c.name.toLowerCase() === component_name.toLowerCase());
    if (!component) {
        return res.status(404).json({ error: "Componente non trovato." });
    }

    // Restituisci il componente trovato
    return res.status(200).json(component);
}
module.exports = {
  distDir: 'build',
}
