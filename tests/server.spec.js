const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it("DELETE /cafes/:id devuelve status 404 al eliminar un café con id que no existe", async () => {
        const idInexistente = 9819238932198132;
        const response = await request(server)
            .delete(`/cafes/${idInexistente}`)
            .set("Authorization", "Bearer token");
        expect(response.statusCode).toBe(404);
    });

    it("POST /cafes agrega un nuevo café y devuelve status 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Flat White" };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);
    });

    it("PUT /cafes/:id devuelve status 400 si el id del parámetro no coincide con el id del payload", async () => {
        const cafeActualizado = { id: 1, nombre: "Cortado Modificado" };
        const idDiferente = 2;
        const response = await request(server)
            .put(`/cafes/${idDiferente}`)
            .send(cafeActualizado);
        expect(response.statusCode).toBe(400);
    });

});
