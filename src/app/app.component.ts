import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AddressModel } from './address.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  companies = [
    {
      name: 'ABC Inc.',
      description: 'The best business to learn alphabets from.',
      timings: '5a.m.–9p.m.',
      address: '1455 Boul. de Maisonneuve Ouest',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'XYZ Business',
      description: 'The best business to learn (reversed) alphabets from.',
      timings: '5a.m.–9p.m.',
      address: 'Concordia University',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEXEAAX4xhf////DAADBAAP6yxj7zRjBAAD8zxjEAwb7zBjHJyjFCAr4xRfEBgnqoRPnmBLFDxHpnRPcdg/efQ/0vBbxtBXIJAfjjBHhhRDabw7LQEHPRwrVXQzwsBXlkxLRTwvKODnILS7HISLYaA3tqRTNPQnWdnbGGRrKMQjQTQvOUVHJMzTUa2zUWwzUXAzag4PntbXjpKTfmJjQXFzMRUXrwMDRXl7cjY3TZ2fbh4ftxsbw0NDYfH3hoKH03d356+uaxFd8AAANq0lEQVR4nO2d6ULjug6A08Zpkw6UfS1bgQFmKJwuLC37+z/VddIFy1ISKenM3Br065yhVfTFtjY7qVc15P2h1+v1+/23t8FgMNTy9NTtdl9fL2O5iWU0Gj1qudNyPZV7La1Y2q12LJ1O5zSWHxM5S+QqljVDlqbSHEs0FW8qk/9vNuNPJd/RKrQqrfP0tNNpt1ut+/vr67u7x9HN5WX3aTjo93rPLx9VIN7svz66fj0W/w+KV1LyrzBGGPUIwm69vAH/LxKD9i3CjzVn8Mbi11uA8L3uGKAWf8kg/HAQUCNefRKeuQioEVtTwlc3AT2v3h0Tvtf/tSV/TOovCWHb1SGMw0ZM+OzuEOpBHGhCh4cwDotV78PlIYxXovfgOOGD13d5kmrCnjdwm9Dve0PnCbuOEw68S+cJbxwnHHoj5wkfHSfsenfOE147TvjqPOGld/9NuNiiCVuOE954ThfAX4Jw5HWcJzx1nPDxCxD+cJzw7ptw0cW//gKEju6sTeVLEF59Ey62aMK1f23DnxX//ptQJJGntJRSocYS5X+SJ/MkjJTaOdzc29u4jQpS6u8dbByv/FzZPd8peaNm4rfmRqh29rbCRqClEW5vRgUMVDu7lTAIxiqOzufDqAmX5qHHU95xGFRmEtR2PaGBKlo1NVRqy4fzQJwXoToMTOtixuBcZKDatzVUwp9zsMxve83yWiK1GlaQhCt8fxGpFUJDULkoPYxzIYy87QY2Txu4tcNWsWUP4OQu3ZZFnAdh5KWYp+UXz8Cd5TQNoWyuY5kDYRZgJfjFUbGT+n2NWNLfaMKysVVtpwNqyZ+oUbScpSA8KIXod8oSqhUTMAiDWg0QL+dr2IYato6WgdcJdsqYWJpQbZrWhLs6FzlYN/8pOMoZArVuAobHWoM6ANBbZQaxNOGFSbP8K4kP6ta0r7GbaaDaNzU0TsYRRq3WjJu0WgLRPy3+3cQScwktT9ec+gWG5STLwF8mYG0W/9SqEYDKeJuShGrVQAk//aY6ACspS8NWhSZRR2YSWHyilST8bYDUNowbrTbNWbaSOgRqzxiq4Nj4XBQFLA154v8o+s3EPnMAtoERajtlbIBEYI4uQw37xk0qntuUIgQDEF7AP16k225oOMq4D+D+pWnIlTKEUWTOxHXLBLBEA9qfqnPzNqCwcmL8tbFZELEMIQhkoR2Wox0QKMmoDTxx+Bv92ZzpjYLOpgQhWEOEK1DH5iD+JIZAbZolyTb+xK05SY6LDWIJQpCuhQfo79Yg4g94HijpD4lLgFBSLHkrQQhcCTEAVsaKkze1Z/6dciVqw5wGxTIb/6zIt5Krm/Y39qmrn4BBRMvMM+doQHuSmqmh0CAWJoSRrEZeG0wyNIhwCFNckenMiq3EwoQwGNihYvIZyGCtRAWKLMoTedDXpNzHHNGExbxwBIbwP/ozwNdY7lRtmJO0kdKsUOZdCPYKDGJRQjg8ASdl0Zm5eSkQCyu1tOscg5H+m4Tg3tKT1PKF1jo6NOdfemZ9Yn4sbaSzpCChOmddGE7TSsPUAIY33XS4WqmglCP+VaFemzX90j9n5l2V4LO+gq64EqbeZqvHcZH2uVQpRmjZl96JUZtgCD4bLmo3YGo4B1FTHjCKEUL7UoJ1LNEFHKpZ1AfrOEsDdNqpPi1dChICPxhepC9l+MlPlwT8TLYGMNHlvkYTFth7AnE404eDxODT18CUNVvDHiczSJdChHD1Z/ZQ4DKa5a/W1EuLNomcwOEWJ6drRQjBXQ02suyD8WLiUmCcrARk3j67GiDMWrK0FCBUh2BcshaRnX1PhgAGGyvZQRrgh8UhsQghfxGhtCsZcCsRyOkyWQtRPE2LEIIhzGllWgsxGQJ7kuY0Q2/h9aTTdE1+FuNQckV7vOIhsOZd9kLWAjVIp6mcEHrSSu0k5+PLCAd60kqNauGYGqilzJcChBV4wbyPwxuivanahxM3zNt+WxX4bixywt8w3Odt7lmLTifZtqfKm3ZqH35eGPSXpIRWzpzfATuAd0TnXXAIc7NpK7nNKERIkRPCVZE/ZxS0L1i3kTPjfaIB3pIG0VnNECmh7RtruElo2wdSZx39YHyr1DIzhkSD5XtljVMpob0o8hwNchRIarn2WlmDcB9KTGi5ifxTBLarsSU/vqG7mjvqpiwJz3lbsYKzOWutO0s4c87SIIsXUkLLr7FamMSZPKG51kVF8UJIaDVeWH7N8r6W1G7lGkS9DCnhT2tJZBY+k++sZC1EThJma8jL84BICS1j8x0hKn8s4YyHrUFUXwgJrWXIOpBlF1BQ8g6FkRokC1FGaHt+1jmX6CLDmbLCt523iRbikujJLntB8HaDVIYz5U04WwO5Z54iTRmhdRKU177Mcqa8JBM5U0FEFBHaSSnTqdkOGIwGwxkTc0dwCkxEiFY8r5CxCi6ogWUq0iBITWWEyFSeffvphLzTsUiDoJUhIzyy7GN2hU7SnSnT79saBDWijNCapNnt+Jmg5Wto4G2XIQ0pB+UoaQqe5cZhiXl0QKWOITc7QRr4MT8SECJHk9+AmHwxNVxwd8uQBn7MFxHajiavVzr74s80Qm4OjQIOL8rEIiK0HQ3Xo9ltCFMD89K2Bv5WqYgQPT7HvIpdVRpjyNVgt0L4rkZAiF0iN+6mVxfsh0UObQ1sVyMZQ3QVTuWTSGqrhm0nqk/YWY2AEM01ZjjMCIj81mdka+CuYBHheuG1kFY/8c/i2ckG249rQvZblHBMYtcwaQExewd/PheXENpLgZ8cojgz1UAf26Q02CGVfTyKT2gd9apIWl5ogss1oL0BrpsTjCFypfwSJq1CFGjADTs2IfeNdDhscwN+esgXaEA1JvfuCAjRPOEX2qkhn1+q/1fUmQoIkbcQnIpIqYEFGlDSwPXDEfvNkArZJ6jRkJcSa0BJAzca8wnRFpJkLxalJGMN3KTII5IGbr+NTYg714JOQkqVL9KAHtpnZu38MUTBQrI/gu0Ta9i2v82svNiE2OFLzuti+xJCdtJG9QmY4YJPiOr0BmNvM92+RIPg3AhOi5jhgk+IbKwJHg2g0zZ2feBRaRGzDxZx3wWNywPJETo6bcs/SmNoQKuEWXrxCVFWkn+Uxvg2uQ8sukf7yNMx+9FcQhzRGoJtSnrrQnKPcNrGrC64hMRGruRoEp2YcjttieBeDy8gRty3zt8iE0WHdcnEVHKPiMSPV5lwCYmzW+xOWyzkXr7oxTN4mXCXMZMQuQrR2zjo1Fs0C3A3i9shYBKi6lB2CJJMvUWnt3Btw00YeL/ggQO+JG2m+4myd7LggMxttzEJUWIpe+4Y7XmIZwFhAfMeMwmxfaIzkFRxIXtekphFzDvEJMQBX/QoINUTFs4CnNoy1zGLkNh5kB0op3rCsgd8iE1Ipi/mEeJ4JikM6PJJOM9x8s7MGHizFOckokOe5CFT7jGAiQbcc2W2W1mERF7J30lPFBAFonAl46yKucPGI6TUiwiJrXxJk4C8ycz6kkeI6zvZwzlUCSxbybgVxlXA+mU5Ygj4ew6JAqIElq1kwhUw3TmPEC8jSQFM781IGj0eVSCyenURk5Bw9jJC4skZma8iAhYroHIJccCWPX1EtTGEhDjpYCWmXEKcdMnem0q1MYTPuxKErGPwvF/pJBJn4RPH2BNKH5XETxfxHhVgEuI5JmpiUH0eKSFRYnJSby5hMe2GEK0oUTORvMucedTk/VoubkJIX5r6myCUacAlKssX8AgpPyYkJI62SQmxL+D4cyahff5Ztn8bC9FOFDWESX/OyTqYs5TIJ2TPG1MPP8myImoPkjMLmrzf5carSPhSKqphKnzpE5F1cLwxkxD7elkzkW4Jlydk5AxLPEIcr6WE1BFTISHOjTl5H4+QyLmEr2mcByFuhHBKYCYhzpvnQCh8gzVFyKgw13iEuPaRvutnDoS4RuUU+WveJYcQ16//gBC/foLT6flrhMTm0xwIGW0MJiHuskhf9RONf8/L/FEnKSHuFXH6kX+NcPqTcaYIFfxRQtwLFBOWFsqI/FaUf+W9FiQUteTnIV+AsNBS4RLiJbBAhN1ihLKNo3kIRZgfsvyzb8Kx8gUm/MEjXK0FloT/gDBsNGpAwvz0XxM+sTLvlfWJrE7lZA5GiyS6uL29PZnI77Hk14dMwvIJyTyEoMkvD7mEiyv+qTf8Jlxs+QKEHecJ21+AcOA4YeubcNHFv/8mXHTxr723b8LFli9AeOf1HSd8dJ5w5DzhzRcg7DlOeOn16v/aiD8q/qvzhF3nCYfOEw6+AOGD44R91wnrPe/5m3Cxpf7sPOGL9+I44YfzhFXvw2lCXxNWfZeLC7+lCVnHoBdV/K4mdDrk1581ocvT1PerMeGbu4NY7yWE7g6if10dE7oaEnWomBBWB24iqpcZYfXJRcR6v/pJWO3XXVuLfuxlDMLqR9spRr9+9V6FhNXqg2Z0A9L362v9GdcnYbX6PjyrT8Wfh0gNKysT20+fXgwqkzCerO8vL88PvV6v3++/DQaD4XD49NTtvr5eXl7eaBmNHh8f7+7ursdyf3/fiqXdbnc6p1p+JHJ2dnYVy1oiS7E0m80okTFN/F/6n5pLY0k+l3xFf/VsrERr63Q6WnNbX0BfaHxFfW1twWikbdEmvb52u09Pw6G29K3f12Y/PL+8Q6Lq/wDEHgEzz1gNHgAAAABJRU5ErkJggg==',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'ABC Inc.',
      description: 'The best business to learn alphabets from.',
      timings: '5a.m.–9p.m.',
      address: '1455 Boul. de Maisonneuve Ouest',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'XYZ Business',
      description: 'The best business to learn (reversed) alphabets from.',
      timings: '5a.m.–9p.m.',
      address: 'Concordia University',
      logo: 'data:image/png;base64,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',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'ABC Inc.',
      description: 'The best business to learn alphabets from.',
      timings: '5a.m.–9p.m.',
      address: '1455 Boul. de Maisonneuve Ouest',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'XYZ Business',
      description: 'The best business to learn (reversed) alphabets from.',
      timings: '5a.m.–9p.m.',
      address: 'Concordia University',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEXEAAX4xhf////DAADBAAP6yxj7zRjBAAD8zxjEAwb7zBjHJyjFCAr4xRfEBgnqoRPnmBLFDxHpnRPcdg/efQ/0vBbxtBXIJAfjjBHhhRDabw7LQEHPRwrVXQzwsBXlkxLRTwvKODnILS7HISLYaA3tqRTNPQnWdnbGGRrKMQjQTQvOUVHJMzTUa2zUWwzUXAzag4PntbXjpKTfmJjQXFzMRUXrwMDRXl7cjY3TZ2fbh4ftxsbw0NDYfH3hoKH03d356+uaxFd8AAANq0lEQVR4nO2d6ULjug6A08Zpkw6UfS1bgQFmKJwuLC37+z/VddIFy1ISKenM3Br065yhVfTFtjY7qVc15P2h1+v1+/23t8FgMNTy9NTtdl9fL2O5iWU0Gj1qudNyPZV7La1Y2q12LJ1O5zSWHxM5S+QqljVDlqbSHEs0FW8qk/9vNuNPJd/RKrQqrfP0tNNpt1ut+/vr67u7x9HN5WX3aTjo93rPLx9VIN7svz66fj0W/w+KV1LyrzBGGPUIwm69vAH/LxKD9i3CjzVn8Mbi11uA8L3uGKAWf8kg/HAQUCNefRKeuQioEVtTwlc3AT2v3h0Tvtf/tSV/TOovCWHb1SGMw0ZM+OzuEOpBHGhCh4cwDotV78PlIYxXovfgOOGD13d5kmrCnjdwm9Dve0PnCbuOEw68S+cJbxwnHHoj5wkfHSfsenfOE147TvjqPOGld/9NuNiiCVuOE954ThfAX4Jw5HWcJzx1nPDxCxD+cJzw7ptw0cW//gKEju6sTeVLEF59Ey62aMK1f23DnxX//ptQJJGntJRSocYS5X+SJ/MkjJTaOdzc29u4jQpS6u8dbByv/FzZPd8peaNm4rfmRqh29rbCRqClEW5vRgUMVDu7lTAIxiqOzufDqAmX5qHHU95xGFRmEtR2PaGBKlo1NVRqy4fzQJwXoToMTOtixuBcZKDatzVUwp9zsMxve83yWiK1GlaQhCt8fxGpFUJDULkoPYxzIYy87QY2Txu4tcNWsWUP4OQu3ZZFnAdh5KWYp+UXz8Cd5TQNoWyuY5kDYRZgJfjFUbGT+n2NWNLfaMKysVVtpwNqyZ+oUbScpSA8KIXod8oSqhUTMAiDWg0QL+dr2IYato6WgdcJdsqYWJpQbZrWhLs6FzlYN/8pOMoZArVuAobHWoM6ANBbZQaxNOGFSbP8K4kP6ta0r7GbaaDaNzU0TsYRRq3WjJu0WgLRPy3+3cQScwktT9ec+gWG5STLwF8mYG0W/9SqEYDKeJuShGrVQAk//aY6ACspS8NWhSZRR2YSWHyilST8bYDUNowbrTbNWbaSOgRqzxiq4Nj4XBQFLA154v8o+s3EPnMAtoERajtlbIBEYI4uQw37xk0qntuUIgQDEF7AP16k225oOMq4D+D+pWnIlTKEUWTOxHXLBLBEA9qfqnPzNqCwcmL8tbFZELEMIQhkoR2Wox0QKMmoDTxx+Bv92ZzpjYLOpgQhWEOEK1DH5iD+JIZAbZolyTb+xK05SY6LDWIJQpCuhQfo79Yg4g94HijpD4lLgFBSLHkrQQhcCTEAVsaKkze1Z/6dciVqw5wGxTIb/6zIt5Krm/Y39qmrn4BBRMvMM+doQHuSmqmh0CAWJoSRrEZeG0wyNIhwCFNckenMiq3EwoQwGNihYvIZyGCtRAWKLMoTedDXpNzHHNGExbxwBIbwP/ozwNdY7lRtmJO0kdKsUOZdCPYKDGJRQjg8ASdl0Zm5eSkQCyu1tOscg5H+m4Tg3tKT1PKF1jo6NOdfemZ9Yn4sbaSzpCChOmddGE7TSsPUAIY33XS4WqmglCP+VaFemzX90j9n5l2V4LO+gq64EqbeZqvHcZH2uVQpRmjZl96JUZtgCD4bLmo3YGo4B1FTHjCKEUL7UoJ1LNEFHKpZ1AfrOEsDdNqpPi1dChICPxhepC9l+MlPlwT8TLYGMNHlvkYTFth7AnE404eDxODT18CUNVvDHiczSJdChHD1Z/ZQ4DKa5a/W1EuLNomcwOEWJ6drRQjBXQ02suyD8WLiUmCcrARk3j67GiDMWrK0FCBUh2BcshaRnX1PhgAGGyvZQRrgh8UhsQghfxGhtCsZcCsRyOkyWQtRPE2LEIIhzGllWgsxGQJ7kuY0Q2/h9aTTdE1+FuNQckV7vOIhsOZd9kLWAjVIp6mcEHrSSu0k5+PLCAd60kqNauGYGqilzJcChBV4wbyPwxuivanahxM3zNt+WxX4bixywt8w3Odt7lmLTifZtqfKm3ZqH35eGPSXpIRWzpzfATuAd0TnXXAIc7NpK7nNKERIkRPCVZE/ZxS0L1i3kTPjfaIB3pIG0VnNECmh7RtruElo2wdSZx39YHyr1DIzhkSD5XtljVMpob0o8hwNchRIarn2WlmDcB9KTGi5ifxTBLarsSU/vqG7mjvqpiwJz3lbsYKzOWutO0s4c87SIIsXUkLLr7FamMSZPKG51kVF8UJIaDVeWH7N8r6W1G7lGkS9DCnhT2tJZBY+k++sZC1EThJma8jL84BICS1j8x0hKn8s4YyHrUFUXwgJrWXIOpBlF1BQ8g6FkRokC1FGaHt+1jmX6CLDmbLCt523iRbikujJLntB8HaDVIYz5U04WwO5Z54iTRmhdRKU177Mcqa8JBM5U0FEFBHaSSnTqdkOGIwGwxkTc0dwCkxEiFY8r5CxCi6ogWUq0iBITWWEyFSeffvphLzTsUiDoJUhIzyy7GN2hU7SnSnT79saBDWijNCapNnt+Jmg5Wto4G2XIQ0pB+UoaQqe5cZhiXl0QKWOITc7QRr4MT8SECJHk9+AmHwxNVxwd8uQBn7MFxHajiavVzr74s80Qm4OjQIOL8rEIiK0HQ3Xo9ltCFMD89K2Bv5WqYgQPT7HvIpdVRpjyNVgt0L4rkZAiF0iN+6mVxfsh0UObQ1sVyMZQ3QVTuWTSGqrhm0nqk/YWY2AEM01ZjjMCIj81mdka+CuYBHheuG1kFY/8c/i2ckG249rQvZblHBMYtcwaQExewd/PheXENpLgZ8cojgz1UAf26Q02CGVfTyKT2gd9apIWl5ogss1oL0BrpsTjCFypfwSJq1CFGjADTs2IfeNdDhscwN+esgXaEA1JvfuCAjRPOEX2qkhn1+q/1fUmQoIkbcQnIpIqYEFGlDSwPXDEfvNkArZJ6jRkJcSa0BJAzca8wnRFpJkLxalJGMN3KTII5IGbr+NTYg714JOQkqVL9KAHtpnZu38MUTBQrI/gu0Ta9i2v82svNiE2OFLzuti+xJCdtJG9QmY4YJPiOr0BmNvM92+RIPg3AhOi5jhgk+IbKwJHg2g0zZ2feBRaRGzDxZx3wWNywPJETo6bcs/SmNoQKuEWXrxCVFWkn+Uxvg2uQ8sukf7yNMx+9FcQhzRGoJtSnrrQnKPcNrGrC64hMRGruRoEp2YcjttieBeDy8gRty3zt8iE0WHdcnEVHKPiMSPV5lwCYmzW+xOWyzkXr7oxTN4mXCXMZMQuQrR2zjo1Fs0C3A3i9shYBKi6lB2CJJMvUWnt3Btw00YeL/ggQO+JG2m+4myd7LggMxttzEJUWIpe+4Y7XmIZwFhAfMeMwmxfaIzkFRxIXtekphFzDvEJMQBX/QoINUTFs4CnNoy1zGLkNh5kB0op3rCsgd8iE1Ipi/mEeJ4JikM6PJJOM9x8s7MGHizFOckokOe5CFT7jGAiQbcc2W2W1mERF7J30lPFBAFonAl46yKucPGI6TUiwiJrXxJk4C8ycz6kkeI6zvZwzlUCSxbybgVxlXA+mU5Ygj4ew6JAqIElq1kwhUw3TmPEC8jSQFM781IGj0eVSCyenURk5Bw9jJC4skZma8iAhYroHIJccCWPX1EtTGEhDjpYCWmXEKcdMnem0q1MYTPuxKErGPwvF/pJBJn4RPH2BNKH5XETxfxHhVgEuI5JmpiUH0eKSFRYnJSby5hMe2GEK0oUTORvMucedTk/VoubkJIX5r6myCUacAlKssX8AgpPyYkJI62SQmxL+D4cyahff5Ztn8bC9FOFDWESX/OyTqYs5TIJ2TPG1MPP8myImoPkjMLmrzf5carSPhSKqphKnzpE5F1cLwxkxD7elkzkW4Jlydk5AxLPEIcr6WE1BFTISHOjTl5H4+QyLmEr2mcByFuhHBKYCYhzpvnQCh8gzVFyKgw13iEuPaRvutnDoS4RuUU+WveJYcQ16//gBC/foLT6flrhMTm0xwIGW0MJiHuskhf9RONf8/L/FEnKSHuFXH6kX+NcPqTcaYIFfxRQtwLFBOWFsqI/FaUf+W9FiQUteTnIV+AsNBS4RLiJbBAhN1ihLKNo3kIRZgfsvyzb8Kx8gUm/MEjXK0FloT/gDBsNGpAwvz0XxM+sTLvlfWJrE7lZA5GiyS6uL29PZnI77Hk14dMwvIJyTyEoMkvD7mEiyv+qTf8Jlxs+QKEHecJ21+AcOA4YeubcNHFv/8mXHTxr723b8LFli9AeOf1HSd8dJ5w5DzhzRcg7DlOeOn16v/aiD8q/qvzhF3nCYfOEw6+AOGD44R91wnrPe/5m3Cxpf7sPOGL9+I44YfzhFXvw2lCXxNWfZeLC7+lCVnHoBdV/K4mdDrk1581ocvT1PerMeGbu4NY7yWE7g6if10dE7oaEnWomBBWB24iqpcZYfXJRcR6v/pJWO3XXVuLfuxlDMLqR9spRr9+9V6FhNXqg2Z0A9L362v9GdcnYbX6PjyrT8Wfh0gNKysT20+fXgwqkzCerO8vL88PvV6v3++/DQaD4XD49NTtvr5eXl7eaBmNHh8f7+7ursdyf3/fiqXdbnc6p1p+JHJ2dnYVy1oiS7E0m80okTFN/F/6n5pLY0k+l3xFf/VsrERr63Q6WnNbX0BfaHxFfW1twWikbdEmvb52u09Pw6G29K3f12Y/PL+8Q6Lq/wDEHgEzz1gNHgAAAABJRU5ErkJggg==',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'ABC Inc.',
      description: 'The best business to learn alphabets from.',
      timings: '5a.m.–9p.m.',
      address: '1455 Boul. de Maisonneuve Ouest',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'XYZ Business',
      description: 'The best business to learn (reversed) alphabets from.',
      timings: '5a.m.–9p.m.',
      address: 'Concordia University',
      logo: 'data:image/png;base64,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',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'ABC Inc.',
      description: 'The best business to learn alphabets from.',
      timings: '5a.m.–9p.m.',
      address: '1455 Boul. de Maisonneuve Ouest',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'XYZ Business',
      description: 'The best business to learn (reversed) alphabets from.',
      timings: '5a.m.–9p.m.',
      address: 'Concordia University',
      logo: 'data:image/png;base64,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',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'ABC Inc.',
      description: 'The best business to learn alphabets from.',
      timings: '5a.m.–9p.m.',
      address: '1455 Boul. de Maisonneuve Ouest',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
    {
      name: 'XYZ Business',
      description: 'The best business to learn (reversed) alphabets from.',
      timings: '5a.m.–9p.m.',
      address: 'Concordia University',
      logo: 'data:image/png;base64,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',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://www.twitter.com/',
      facebook: 'https://www.facebook.com/',
    },
  ];

  public addresses: AddressModel[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get('assets/addresses.csv', { responseType: 'text' })
      .subscribe((data) => {
        let csvToRowArray = data.split('\n');

        let headers = csvToRowArray[0].trim().split(', ');
        console.log(headers);

        csvToRowArray.forEach((row, index) => {
          if (index === 0) {
            return;
          }
          const addressArray = row.trim().split(',');
          this.addresses.push(
            new AddressModel(
              addressArray[0],
              addressArray[1],
              addressArray[2],
              addressArray[3],
              addressArray[4],
              addressArray[5]
            )
          );
        });

        console.log(this.addresses);
      });
  }
}
