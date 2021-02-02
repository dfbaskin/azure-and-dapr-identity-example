FROM mcr.microsoft.com/dotnet/aspnet:5.0
COPY ./build/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "ExampleApp.Users.dll"]
