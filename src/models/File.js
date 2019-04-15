const mongoose = require('mongoose');
const File = new mongoose.Schema(
    {
        title: 
        {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true,
        toObject: { virtuals: true }, // força que seja retornado o campo virtual "url"
        toJSON: { virtuals: true } // força que seja retornado o campo virtual "url"
    }
);

// cria um campo virtual (campo calculado) de nome url
// dentro do método get tem que ser uma function e não uma arrow function porque precisa acessar o this
File.virtual("url").get(function() {
    const url = process.env.URL || 'http://localhost:3333';

    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);

