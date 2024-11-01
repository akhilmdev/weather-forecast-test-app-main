/// <reference types="google.maps" />
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

interface SelectedPlace {
  lat: number;
  lng: number;
}

export type SelectedPlaceType = SelectedPlace | null;

@Options({
  props: {},
  watch: {
    selectedPlace: {
      handler(newVal) {
        if (newVal) {
          this.updateSelectedPlace(newVal);
        }
      },
    },
  },
  methods: {
    ...mapActions(["updateSelectedPlace"]),
  },
})
export default class SearchCity extends Vue {
  selectedPlace: SelectedPlaceType = null;

  placeChanged(place: any) {
    this.selectedPlace = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  }

  // this will be called when the user clicks on the map and
  //will set the selected place to the coordinates of the clicked location
  handleMapClick(event: google.maps.MapMouseEvent) {
    // check if the event has a latLng property
    if (!event.latLng) {
      return;
    }

    this.selectedPlace = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
  }
}
