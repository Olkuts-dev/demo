<script setup lang="ts">
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { players as playersMock } from '@/utils/mock';
  //import { Engine } from '@/engine/engine.module';
  //import { PlayerPositionPublic } from '@/engine/modules/court/services/player/player.dto';
  // ↓
  export interface PlayerPositionPublic {
    steam_id: string;
    steam_name: string;
    steam_avatar: string;

    position: string;
  }

  let map: L.Map;

  const isReady = ref<boolean>(false);

  const side = 3000;

  const _players = ref(playersMock);

  type ParsedPosition = Record<'x' | 'y', number>;

  const interval = setInterval(() => {
    updatePositions();
  }, 500);

  onMounted(async () => {
    drawMap();
    updatePositions();
  });

  onUnmounted(() => {
    clearInterval(interval);
  });

  const updatePositions = async () => {
    //const players = await Engine.court.player.getRealtimePositions(4);
    
    // Эмулирую обновление позиции
    _players.value = _players.value.map(v => {
      const newPosition = v.position
        .split(' ')
        .map(t => +t + (Math.random() > 0.4 ? -5 : 5))
        .join(' ');

      return {
        ...v,
        position: newPosition
      };
    });

    drawPlayers(_players.value);
  };

  const parsePosition = (position: string): ParsedPosition => {
    const [x, _, y] = position.split(' ');
    return {
      x: +x,
      y: +y,
    };
  };

  const reformatPosition = (position: ParsedPosition): ParsedPosition => {
    return {
      x: position.x,
      y: position.y,
    };
  };

  const drawMap = () => {
    map = L.map('mapContainer', {
      crs               : L.CRS.Simple,
      minZoom           : -2,
      maxZoom           : 5,
      layers            : undefined,
      attributionControl: false,
      zoomControl       : false,
    });

    const bounds = new L.LatLngBounds([-side / 2, -side / 2], [side / 2, side / 2]);
    L.imageOverlay('https://i.imgur.com/9cPU846.jpeg', bounds).addTo(map);

    map.fitBounds(bounds, { animate: false });
  };

  const markerCash: Record<string, L.Marker> = {};

  const drawPlayers = (players: PlayerPositionPublic[]) => {
    players.forEach((v) => {

      const parsed = parsePosition(v.position);
      const reformated = reformatPosition(parsed);
      const exists = markerCash[v.steam_id];

      if (exists) {
        exists.setLatLng([reformated.y, reformated.x]);
        return;
      }

      const icon = L.divIcon({
        html     : `<img src="${v.steam_avatar}" class="avatar">`,
        iconSize : [35, 35],
        className: '',
      });

      markerCash[v.steam_id] = L.marker([reformated.y, reformated.x], { icon, riseOnHover: true })
        .addTo(map)
        .bindPopup(`${v.steam_name} [${v.steam_id}]`);
    });
    isReady.value = true;
  };

</script>

<template>
  <div id="mapContainer" />
</template>

<style lang="scss" scoped>
#mapContainer {
  height: 100%;
  z-index: 5;
  background-color: #111111;
}

:deep() {
  .leaflet-marker-shadow,
  .leaflet-popup,
  .leaflet-marker-icon {
    -webkit-transition: all 1s linear;
    -moz-transition: all 1s linear;
    -o-transition: all 1s linear;
    -ms-transition: all 1s linear;
    transition: all 1s linear;
  }
  
  .avatar {
    @apply h-full;
    @apply border-2 border-ra-black;
    border-radius: 50%;
  }

  .leaflet-popup {
    .leaflet-popup-content-wrapper {
      @apply text-ra-white font-bold;
      @apply bg-ra-primary/50;
      backdrop-filter: blur(2px);
    }
    .leaflet-popup-tip {
      @apply bg-ra-primary/50;
      backdrop-filter: blur(2px);
    }
  }
}

</style>