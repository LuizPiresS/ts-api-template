import supertest from "supertest";

describe("Personal portfolio functional tests", () => {
  it("Should return personal data with just few git repository", async () => {
    const { body, status } = await supertest(app).get("/portfolio");
    expect(status).toBe(200);
    expect(body).toEqual({
      id: 260514439,
      name: "ITeacher",
      private: false,
      html_url: "https://github.com/LuizPiresS/ITeacher",
      description:
        "Plataforma multilateral que conecta alunos que desejam contratar professores para que ministrem aulas particulares nas mais variadas disciplinas.",
      git_tags_url:
        "https://api.github.com/repos/LuizPiresS/ITeacher/git/tags{/sha}",
      stargazers_url:
        "https://api.github.com/repos/LuizPiresS/ITeacher/stargazers",
      created_at: "2020-05-01T17:09:45Z",
      updated_at: "2020-09-01T02:06:56Z",
      pushed_at: "2020-08-30T14:15:01Z",
      clone_url: "https://github.com/LuizPiresS/ITeacher.git",
      homepage: "",
      license: {
        name: "MIT License",
        url: "https://api.github.com/licenses/mit",
      },
    });
  });
});
