import requests
from bs4 import BeautifulSoup

def obter_informacoes_aerodromo(icao):
    url = f"https://aisweb.decea.mil.br/?i=aerodromos&codigo={icao}"
    response = requests.get(url, timeout=10)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        cartas_disponiveis = soup.find("hr", id="cartas").find_next_sibling("h4", class_="heading-primary", id = None).string.strip()
        
        nascer_sol = soup.find("sunrise").string.strip()
        por_sol = soup.find("sunset").string.strip()
        metar = soup.find("h5", string="METAR").next_sibling.next_sibling.string.strip() if soup.find("h5", string="METAR").next_sibling.next_sibling.string else "Não disponível"
        taf = soup.find("h5",  string="TAF").next_sibling.next_sibling.string.strip() if soup.find("h5",  string="TAF").next_sibling.next_sibling.string else "Não disponível"
        print(f"Cartas disponíveis: {cartas_disponiveis.split(' ')[1]}")
        print(f"Horário do nascer do sol de hoje: {nascer_sol}")
        print(f"Horário do pôr do sol de hoje: {por_sol}")
        print(f"Informação METAR: {metar}")
        print(f"Informação TAF: {taf}")
    else:
        print("Erro ao acessar o site AISWEB.")

if __name__ == "__main__":
    icao = input("Digite o código ICAO do aeródromo (ex: SBMT, SBJD): ")
    obter_informacoes_aerodromo(icao)