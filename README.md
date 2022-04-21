# The Village of Stones

O The Village of Stones foi desenvolvido na disciplina de Probabilidade e Estatística do curso de Bacharelado em Ciência da Computação da Universidade Estadual Paulista "Júlio de Mesquita Filho". Assim, tanto conceitos de probabilidade como de estatística foram implementados em sua mecânica, de modo a trazer uma aplicação prática do conteúdo que foi ensinado na disciplina. O jogo utilizou um modelo probabilístico para o cálculo do dano crítico.

<p align="center">
    <img src="core/jogo/static/jogo/img/logo.png" alt="Logo do The Village of Stones" style="width: 300px;">
</p>

## 💻 Pré-requisitos

* [Django 2.2.5](https://www.djangoproject.com/) - Framework Python para Web
* [Phaser v.2](https://phaser.io/) - Framework HTML5 de jogos
* [Bootstrap v4.4.1](https://getbootstrap.com/) - Framework CSS
* [PostgreSQL v13.4](https://www.postgresql.org/) - SGBD PostgreSQL

## ☕ Utilizando o The Village of Stones
Após clonar o repositório, é necessário realizar a configuração do PostgreSQL. A seguir, segue os comandos para realizara a configuração do PostgreSQL via terminal:

```
$ su - postgres
$ psql
=# CREATE DATABASE <nome_banco>;
=# CREATE USER <usuario> WITH PASSWORD '<senha>';
=# ALTER ROLE <usuario> SET client_encoding TO 'utf8';
=# ALTER ROLE <usuario> SET default_transaction_isolation TO 'read committed';
=# ALTER ROLE <usuario> SET timezone TO 'UTC';
=# GRANT ALL PRIVILEGES ON DATABASE <nome_banco> TO <usuario>;

# Caso seja necessário trocar a senha:
=# ALTER USER <usuario> WITH ENCRYPTED PASSWORD '<nova_senha>';
```

Após isso, é necessário realizar a configuração das váriaveis de ambiente. Assim, crie o arquivo ```variaveis.py``` e insira as informações seguindo o modelo encontrado em ```core/variaveis_pattern.py```. Por fim, inicialize o site com o comando:
```
$ python manage.py runserver

# Caso seja necessário, execute:
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py createsuperuser
```

## 📚 Desenvolvedores
* Leandro Marcos da Silva [Facebook](https://www.facebook.com/silvamleandro) - [Linkedin](https://www.linkedin.com/in/silvamleandro)
* Murilo Ignácio Carvalho [Facebook](https://www.facebook.com/murilo.ignaciocarvalho) - [Linkedin](https://www.linkedin.com/in/murilo-carvalho)
* Paulo André Pimenta Aragão [Facebook](https://www.facebook.com/paulo.andre.pimenta.aragao) - [Linkedin](https://www.linkedin.com/in/paulo-andre-pimenta-aragao/)
* Victor Fernandes Gardini [Facebook](https://www.facebook.com/victorfernandes.gardini) - [Linkedin](https://www.linkedin.com/in/victorgardini)

[⬆ Voltar ao topo](#the-village-of-stones)<br>
