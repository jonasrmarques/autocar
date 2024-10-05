function Body({
  auto,
  handleEdit,
  handleDelete,
  handleSubmit,
  marca,
  modelo,
  ano,
  preco,
  editModels,
  setMark,
  setModels,
  setPrice,
  setYear,
}) {
  return (
    <main className="body">
      <div className="container">
        <div className="auto-card">
          <h2>Nossos Carros</h2>
          <ul className="auto-list">
            {auto.map((autos) => (
              <li key={autos.id} className="auto-car">
                <div className="auto-details">
                  <h3>Marca: {autos.marca}</h3>
                  <h3>Modelo: {autos.modelo}</h3>
                  <h3>Ano: {autos.ano}</h3>
                  <p>
                    Preço:{" "}
                    {autos.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <div className="auto-actions">
                  <button onClick={() => handleEdit(autos)}>Editar</button>
                  <button
                    onClick={() => {
                      let confirmacao = prompt(
                        "Certeza que você deseja excluir?"
                      ).toLowerCase();
                      if (confirmacao === "sim") {
                        return handleDelete(autos.id);
                      }
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-card">
          <h2>{editModels ? "Editar Automóvel" : "Adicionar Automóvel"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Marca:
              <input
                type="text"
                name="marca"
                value={marca}
                onChange={(e) => setMark(e.target.value)}
                required
                minLength="2"
                placeholder="Marca"
              />
            </label>

            <label>
              Modelo:
              <input
                type="text"
                name="modelo"
                value={modelo}
                onChange={(e) => setModels(e.target.value)}
                required
                minLength="2"
                placeholder="Modelo"
              />
            </label>

            <label>
              Ano:
              <input
                type="number"
                name="ano"
                value={ano}
                onChange={(e) => setYear(e.target.value)}
                required
                min="1900"
                max="2024"
                placeholder="Ano"
              />
            </label>

            <label>
              Preço:
              <input
                type="number"
                name="preco"
                value={preco}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0.01"
                step="0.01"
                placeholder="Preço"
              />
            </label>

            <input type="submit" value={editModels ? "Atualizar" : "Criar"} />
          </form>
        </div>
      </div>
    </main>
  );
}

export default Body;
