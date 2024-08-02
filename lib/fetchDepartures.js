import axios from 'axios';
import cheerio from 'cheerio';

export const fetchDepartures = async () => {
  const response = await axios.get('https://maps.ulaanbaatar-airport.mn/crawler.php?s=Departure&l=mn');
  const $ = cheerio.load(response.data);

  let departuresArray = [];
  $('table tbody tr').each((index, element) => {
    const flightNumber = $(element).find('td:nth-child(1)').text().trim();
    const destination = $(element).find('td:nth-child(2)').text().trim();
    const departureTime = $(element).find('td:nth-child(3)').text().trim();
    const status = $(element).find('td:nth-child(4)').text().trim();

    departuresArray.push({ flightNumber, destination, departureTime, status });
  });

  return departuresArray;
};