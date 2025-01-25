import express from "express";

const app = express();

app.use(express.json())

const livros = [
    {
        id: 1,
        titulo: "Titulo 1"

    },
    {
        id: 2,
        titulo: "Titulo 2"

    }
]


app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});


app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;

    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("livro cadastrado com sucesso");
});


app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("apagado com sucesso");
});

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id === Number(id));
};


export default app;