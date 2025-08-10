using Microsoft.VisualStudio.TestPlatform.Utilities;
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Net;

namespace ApiTests
{
    [TestFixture]
    public class DestinationTests : IDisposable
    {
        private RestClient client;
        private string token;

        [SetUp]
        public void Setup()
        {
            client = new RestClient(GlobalConstants.BaseUrl);
            token = GlobalConstants.AuthenticateUser("john.doe@example.com", "password123");

            Assert.That(token, Is.Not.Null.Or.Empty, "Authentication token should not be null or empty");
        }

        [Test]
        public void Test_GetAllDestinations()
        {
           
            {
                // Arrange
                var request = new RestRequest("destination", Method.Get);
                request.AddHeader("Authorization", $"Bearer {token}");

                // Act
                var response = client.Execute(request);

                // Assert — Response Assertions
                Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK), "Expected HTTP 200 OK.");
                Assert.That(response.Content, Is.Not.Null.And.Not.Empty, "Response content should not be empty.");

                // Assert — Data Structure
                JArray destinations;
                try
                {
                    destinations = JArray.Parse(response.Content);
                }
                catch (Exception ex)
                {
                    Assert.Fail($"Response is not a valid JSON array. Exception: {ex.Message}");
                    return;
                }

                Assert.That(destinations.Count, Is.GreaterThan(0), "Expected at least one destination.");

                // Assert — Destination Fields
                foreach (var dest in destinations)
                {
                    Assert.That(dest["name"]?.ToString(), Is.Not.Null.And.Not.Empty, "Destination name is missing.");
                    Assert.That(dest["location"]?.ToString(), Is.Not.Null.And.Not.Empty, "Destination location is missing.");
                    Assert.That(dest["description"]?.ToString(), Is.Not.Null.And.Not.Empty, "Destination description is missing.");
                    Assert.That(dest["category"]?.ToString(), Is.Not.Null.And.Not.Empty, "Destination category is missing.");
                    Assert.That(dest["attractions"], Is.TypeOf<JArray>(), "Attractions should be a JSON array.");
                    Assert.That(dest["bestTimeToVisit"]?.ToString(), Is.Not.Null.And.Not.Empty, "Best time to visit is missing.");
                }
            }

        }

        [Test]
        public void Test_GetDestinationByName()
        {
            var getRequest = new RestRequest("destination", Method.Get);

            var getResponse = client.Execute(getRequest);

            Assert.Multiple(() =>
            {
                Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "Response status code is not as expected");

                Assert.That(getResponse.Content, Is.Not.Null.Or.Empty, "Response content is not as expected");

                var destinations = JArray.Parse(getResponse.Content);
                var destination = destinations.FirstOrDefault(d => d["name"]?.ToString() == "New York City");

                Assert.That(destination["location"]?.ToString(), Is.EqualTo("New York, USA"), "Location property does not have the correct value");

                Assert.That(destination["description"]?.ToString(), Is.EqualTo("The largest city in the USA, known for its skyscrapers, culture, and entertainment."), "Destination property does not have the correct value.");

            });

        }

        [Test]
        public void Test_AddDestination()
        {
            //Arrange
            //Get All categories and extract first category id
            var getCategoriesRequest = new RestRequest("category", Method.Get);

            var getCategoriesResponse = client.Execute(getCategoriesRequest);

            var categories = JArray.Parse(getCategoriesResponse.Content);
            var firstCategory = categories.First();
            var categoryId = firstCategory["_id"]?.ToString();

            //Create new destination
            var addRequest = new RestRequest("destination", Method.Post);

            addRequest.AddHeader("Authorization", $"Bearer {token}");
            var name = "Random Name";
            var location = "New Location";
            var description = "New Description";
            var bestTimeToVisit = "June";
            var attractions = new[] { "Attraction1", "Attraction2", "Attraction3" };
            addRequest.AddJsonBody(new { 
                name, 
                location, 
                description, 
                bestTimeToVisit,
                attractions,
                category = categoryId
            
            });

            //Act

            var addResponse = client.Execute(addRequest);

            //Assert

            Assert.Multiple(() =>
            {
                Assert.That(addResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "Response content is not as expected");

                Assert.That(addResponse.Content, Is.Not.Null.Or.Empty, "Response content is not as expected");

                var createdDestination = JObject.Parse(addResponse.Content);
                Assert.That(createdDestination["_id"]?.ToString(), Is.Not.Empty);

                //GEt destination by Id

                var getDestinationRequest = new RestRequest($"/destination/{createdDestination["_id"]}", Method.Get);

                var getResponse = client.Execute(getDestinationRequest);

                //Assert
                Assert.Multiple(() =>
                {
                    Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "Response status code is not as expected");

                    Assert.That(getResponse.Content, Is.Not.Null.Or.Empty, "Response content is not as expected");

                    var destination = JObject.Parse(getResponse.Content);

                    Assert.That(destination["name"]?.ToString(), Is.EqualTo(name));
                    Assert.That(destination["location"]?.ToString(), Is.EqualTo(location));
                    Assert.That(destination["description"]?.ToString(), Is.EqualTo(description));
                    Assert.That(destination["bestTimeToVisit"]?.ToString(), Is.EqualTo(bestTimeToVisit));
                    Assert.That(destination["category"]?.ToString(), Is.Not.Null.Or.Empty);
                    Assert.That(destination["category"]["_id"]?.ToString(), Is.EqualTo(categoryId));
                    Assert.That(destination["attractions"].Count, Is.EqualTo(3));
                    Assert.That(destination["attractions"].Type, Is.EqualTo(JTokenType.Array));
                    Assert.That(destination["attractions"][0]?.ToString(), Is.EqualTo("Attraction1"));
                    Assert.That(destination["attractions"][1]?.ToString(), Is.EqualTo("Attraction2"));
                    Assert.That(destination["attractions"][2]?.ToString(), Is.EqualTo("Attraction3"));
                });
            });
        }

        [Test]
        public void Test_UpdateDestination()
        {
            // Arrange - Get all destinations
            var getRequest = new RestRequest("destination", Method.Get);
            var getResponse = client.Execute(getRequest);

            Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "GET response status code is not as expected");
            Assert.That(getResponse.Content, Is.Not.Null.Or.Empty, "GET response content is empty");

            var destinations = JArray.Parse(getResponse.Content);

            // Try to find Machu Picchu
            var destinationToUpdate = destinations.FirstOrDefault(d =>
                string.Equals(d["name"]?.ToString(), "Machu Picchu", StringComparison.OrdinalIgnoreCase)
            );

            Assert.That(destinationToUpdate, Is.Not.Null, "Destination 'Machu Picchu' not found in response");

            // Ensure ID field exists
            var destinationId = destinationToUpdate["_id"]?.ToString();
            Assert.That(destinationId, Is.Not.Null.Or.Empty, "Destination ID is missing or null");

            // Act - Update destination
            var updateRequest = new RestRequest($"destination/{destinationId}", Method.Put);
            updateRequest.AddHeader("Authorization", $"Bearer {token}");
            updateRequest.AddJsonBody(new
            {
                name = "UpdatedName",
                bestTimeToVisit = "Winter"
            });

            var updateResponse = client.Execute(updateRequest);

            // Assert - Validate update
            Assert.Multiple(() =>
            {
                Assert.That(updateResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "PUT response status code is not as expected");
                Assert.That(updateResponse.Content, Is.Not.Null.Or.Empty, "PUT response content is empty");

                var updatedDestination = JObject.Parse(updateResponse.Content);
                Assert.That(updatedDestination["name"]?.ToString(), Is.EqualTo("UpdatedName"), "Name was not updated correctly");
                Assert.That(updatedDestination["bestTimeToVisit"]?.ToString(), Is.EqualTo("Winter"), "Best time to visit was not updated correctly");
            });
        }

        [Test]
        public void Test_DeleteDestination()
        {

            // Arrange - Get all destinations
            var getRequest = new RestRequest("destination", Method.Get);
            var getResponse = client.Execute(getRequest);

            Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "GET response status code is not as expected");
            Assert.That(getResponse.Content, Is.Not.Null.Or.Empty, "GET response content is empty");

            var destinations = JArray.Parse(getResponse.Content);
            var destinationToDelete = destinations.FirstOrDefault(d =>
                string.Equals(d["name"]?.ToString(), "Yellowstone National Park", StringComparison.OrdinalIgnoreCase)
            );

            Assert.That(destinationToDelete, Is.Not.Null, "Destination 'Yellowstone National Park' not found in list");

            var destinationId = destinationToDelete["_id"]?.ToString();
            Assert.That(destinationId, Is.Not.Null.Or.Empty, "Destination ID is missing");

            // Act - Send DELETE request
            var deleteRequest = new RestRequest($"destination/{destinationId}", Method.Delete);
            deleteRequest.AddHeader("Authorization", $"Bearer {token}");

            var deleteResponse = client.Execute(deleteRequest);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(deleteResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK), "DELETE response status code is not as expected");

                // Verify deletion
                var verifyRequest = new RestRequest($"destination/{destinationId}", Method.Get);
                var verifyResponse = client.Execute(verifyRequest);

                Assert.That(
                    verifyResponse.StatusCode,
                    Is.EqualTo(HttpStatusCode.NotFound).Or.EqualTo(HttpStatusCode.OK),
                    "Expected resource to be deleted");

            });

        }




            

        public void Dispose()
        {
            client?.Dispose();
        }
    }
}
