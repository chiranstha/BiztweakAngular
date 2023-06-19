#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/BizTweak.Web.Host/BizTweak.Web.Host.csproj", "src/BizTweak.Web.Host/"]
COPY ["src/BizTweak.Web.Core/BizTweak.Web.Core.csproj", "src/BizTweak.Web.Core/"]
COPY ["src/BizTweak.Application/BizTweak.Application.csproj", "src/BizTweak.Application/"]
COPY ["src/BizTweak.Application.Shared/BizTweak.Application.Shared.csproj", "src/BizTweak.Application.Shared/"]
COPY ["src/BizTweak.Core.Shared/BizTweak.Core.Shared.csproj", "src/BizTweak.Core.Shared/"]
COPY ["src/BizTweak.Core/BizTweak.Core.csproj", "src/BizTweak.Core/"]
COPY ["src/BizTweak.EntityFrameworkCore/BizTweak.EntityFrameworkCore.csproj", "src/BizTweak.EntityFrameworkCore/"]
COPY ["src/BizTweak.GraphQL/BizTweak.GraphQL.csproj", "src/BizTweak.GraphQL/"]
RUN dotnet restore "src/BizTweak.Web.Host/BizTweak.Web.Host.csproj"
COPY . .
WORKDIR "/src/src/BizTweak.Web.Host"
RUN dotnet build "BizTweak.Web.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BizTweak.Web.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BizTweak.Web.Host.dll"]
